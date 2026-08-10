from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, AIUsage
from firebase_auth import verify_token

router = APIRouter()


@router.get("/ai-usage")
def get_ai_usage(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")
    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    usage = db.query(AIUsage).filter(
        AIUsage.user_id == user.id,
        AIUsage.feature == "ALL"
    ).first()

    if usage is None:

        usage = AIUsage(
            user_id=user.id,
            feature="ALL",
            used_count=0,
            daily_limit=20,
            last_reset=__import__("datetime").date.today()
        )

        db.add(usage)
        db.commit()
        db.refresh(usage)

    return {
        "used": usage.used_count,
        "limit": usage.daily_limit,
        "remaining": usage.daily_limit - usage.used_count
    }