from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from firebase_admin import auth

from database.database import get_db
from database.models import User

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    try:

        token = credentials.credentials

        decoded = auth.verify_id_token(token)

        firebase_uid = decoded["uid"]

        user = (
            db.query(User)
            .filter(User.firebase_uid == firebase_uid)
            .first()
        )

        if not user:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )