from fastapi import Depends, Header, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User
from firebase_auth import verify_token


def _extract_bearer_token(authorization: str | None) -> str:
    if not authorization or not authorization.strip():
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing",
        )

    parts = authorization.split()
    if len(parts) == 2 and parts[0].lower() == "bearer":
        token = parts[1].strip()
    else:
        token = authorization.replace("Bearer ", "").strip()

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing",
        )

    return token


def _claims_email(decoded: dict, firebase_uid: str) -> str:
    email = (decoded.get("email") or "").strip()
    if email:
        return email
    return f"{firebase_uid}@firebase.local"


def _claims_name(decoded: dict) -> str:
    return (decoded.get("name") or decoded.get("email") or "").strip()


def get_or_create_user_from_claims(db: Session, decoded: dict) -> User:
    firebase_uid = decoded.get("uid")
    if not firebase_uid:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    email = _claims_email(decoded, firebase_uid)
    name = _claims_name(decoded)

    user = (
        db.query(User)
        .filter(User.firebase_uid == firebase_uid)
        .first()
    )

    if user:
        updated = False
        if name and user.name != name:
            user.name = name
            updated = True
        if email and user.email != email:
            conflict = (
                db.query(User)
                .filter(
                    User.email == email,
                    User.firebase_uid != firebase_uid,
                )
                .first()
            )
            if not conflict:
                user.email = email
                updated = True
        if updated:
            db.commit()
            db.refresh(user)
        return user

    user = User(
        firebase_uid=firebase_uid,
        email=email,
        name=name or None,
    )
    db.add(user)

    try:
        db.commit()
        db.refresh(user)
        return user
    except IntegrityError:
        db.rollback()

    user = (
        db.query(User)
        .filter(User.firebase_uid == firebase_uid)
        .first()
    )
    if user:
        return user

    user = User(
        firebase_uid=firebase_uid,
        email=f"{firebase_uid}@firebase.local",
        name=name or None,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> User:
    token = _extract_bearer_token(authorization)

    try:
        decoded = verify_token(token)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    return get_or_create_user_from_claims(db, decoded)
