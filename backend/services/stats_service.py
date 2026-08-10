from sqlalchemy.orm import Session
from database.models import UserStats


def add_xp(
    db: Session,
    firebase_uid: str,
    xp: int = 0,
    coins: int = 0,
    courses: int = 0,
    lessons: int = 0,
    quizzes: int = 0,
    ai: int = 0,
    coding: int = 0,
    resume_checks: int = 0
):

    stats = db.query(UserStats).filter(
        UserStats.firebase_uid == firebase_uid
    ).first()

    if stats is None:

        stats = UserStats(
            firebase_uid=firebase_uid,
            xp=0,
            coins=0,
            courses=0,
            lessons_completed=0,
            quizzes=0,
            ai_questions=0,
            coding_interviews=0,
            resume_checks=0,
            streak=0,
            level=1
        )

        db.add(stats)
        db.flush()

    stats.courses += courses
    stats.lessons_completed += lessons
    stats.quizzes += quizzes
    stats.ai_questions += ai
    stats.coding_interviews += coding
    stats.resume_checks += resume_checks

    stats.xp += xp
    stats.coins += coins

    stats.level = (stats.xp // 500) + 1

    db.commit()
    db.refresh(stats)

    return stats