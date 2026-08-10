from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import UserStats

router = APIRouter()


@router.get("/stats/{uid}")
def get_stats(uid: str, db: Session = Depends(get_db)):

    stats = db.query(UserStats).filter(
        UserStats.firebase_uid == uid
    ).first()

    if stats is None:

        stats = UserStats(firebase_uid=uid)

        db.add(stats)

        db.commit()

        db.refresh(stats)

    return {
    "courses": stats.courses,
    "lessons_completed": stats.lessons_completed,
    "quizzes": stats.quizzes,
    "ai_questions": stats.ai_questions,
    "coding_interviews": stats.coding_interviews,
    "resume_checks": stats.resume_checks,

    "xp": stats.xp,
    "coins": stats.coins,
    "level": stats.level,
    "streak": stats.streak
}