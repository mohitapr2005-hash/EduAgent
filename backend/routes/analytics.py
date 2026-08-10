from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import UserStats

router = APIRouter()


@router.get("/analytics/{uid}")
def analytics(uid: str, db: Session = Depends(get_db)):

    stats = db.query(UserStats).filter(
        UserStats.firebase_uid == uid
    ).first()

    if not stats:

        return {
            "courses": 0,
            "lessons_completed": 0,
            "quizzes": 0,
            "ai_questions": 0,
            "coding_interviews": 0,
            "resume_checks": 0,
            "xp": 0,
            "streak": 0
        }

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