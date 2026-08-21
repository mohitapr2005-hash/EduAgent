from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, AIUsage
from dependencies.auth import get_current_user

router = APIRouter()


@router.get("/ai-usage")
def get_ai_usage(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

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
