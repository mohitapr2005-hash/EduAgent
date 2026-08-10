from datetime import date
from sqlalchemy.orm import Session
from database.models import AIUsage, User


DAILY_LIMIT = 50


def check_ai_limit(db: Session, firebase_uid: str):

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        return False, "User not found"

    today = date.today()

    usage = db.query(AIUsage).filter(
        AIUsage.user_id == user.id,
        AIUsage.feature == "ALL"
    ).first()

    if usage is None:

        usage = AIUsage(
            user_id=user.id,
            feature="ALL",
            used_count=0,
            daily_limit=DAILY_LIMIT,
            last_reset=today
        )

        db.add(usage)
        db.commit()
        db.refresh(usage)

    if usage.last_reset != today:

        usage.used_count = 0
        usage.last_reset = today

        db.commit()

    remaining = usage.daily_limit - usage.used_count

    if remaining <= 0:
        return False, 0

    return True, remaining


def increase_ai_usage(db: Session, firebase_uid: str):

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    today = date.today()

    usage = db.query(AIUsage).filter(
        AIUsage.user_id == user.id,
        AIUsage.feature == "ALL"
    ).first()

    usage.used_count += 1

    db.commit()

    return usage.daily_limit - usage.used_count