from sqlalchemy.orm import Session
from database.models import Course
import json


def create_course(
    db: Session,
    user_id: int,
    title: str,
    description: str,
    roadmap: dict
):


    course = Course(
        user_id=user_id,
        title=title,
        description=description,
        roadmap_json=json.dumps(roadmap)
    )

    db.add(course)
    db.commit()
    db.refresh(course)

    return course
def get_user_courses(
    db: Session,
    user_id: int
):

    courses = (
        db.query(Course)
        .filter(Course.user_id == user_id)
        .order_by(Course.id.desc())
        .all()
    )

    result = []

    for course in courses:

        progress = db.query(Progress).filter(
            Progress.user_id == user_id,
            Progress.course_id == course.id
        ).first()

        completed = 0

        if progress:
            completed = progress.completed_week

        roadmap = json.loads(course.roadmap_json)

        total_weeks = len(roadmap["weeks"])

        percent = int((completed / total_weeks) * 100)

        result.append({
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "completed_week": completed,
            "total_weeks": total_weeks,
            "progress": percent
        })

    return result
from database.models import Progress

from database.models import Progress

def save_progress(
    db: Session,
    user_id: int,
    course_id: int,
    completed_week: int
):

    progress = (
        db.query(Progress)
        .filter(
            Progress.user_id == user_id,
            Progress.course_id == course_id
        )
        .first()
    )

    if progress:
        progress.completed_week = completed_week
    else:
        progress = Progress(
            user_id=user_id,
            course_id=course_id,
            completed_week=completed_week
        )
        db.add(progress)

    db.commit()
    db.refresh(progress)

    return progress
    

from database.models import Progress


def get_progress(db, user_id, course_id):

    progress = db.query(Progress).filter(
        Progress.user_id == user_id,
        Progress.course_id == course_id
    ).first()

    return progress


from database.models import ChatHistory


def save_chat(
    db: Session,
    firebase_uid: str,
    question: str,
    answer: str
):

    chat = ChatHistory(
        firebase_uid=firebase_uid,
        question=question,
        answer=answer
    )

    db.add(chat)

    db.commit()

    db.refresh(chat)

    return chat


def get_chat_history(
    db: Session,
    firebase_uid: str
):

    return (
        db.query(ChatHistory)
        .filter(
            ChatHistory.firebase_uid == firebase_uid
        )
        .order_by(ChatHistory.id.desc())
        .all()
    )


def get_chat(
    db: Session,
    chat_id: int,
    firebase_uid: str
):

    return (
        db.query(ChatHistory)
        .filter(
            ChatHistory.id == chat_id,
            ChatHistory.firebase_uid == firebase_uid
        )
        .first()
    )


def delete_chat(
    db: Session,
    chat_id: int,
    firebase_uid: str
):

    chat = (
        db.query(ChatHistory)
        .filter(
            ChatHistory.id == chat_id,
            ChatHistory.firebase_uid == firebase_uid
        )
        .first()
    )

    if chat:

        db.delete(chat)

        db.commit()

    return chat

from datetime import date
from database.models import AIUsage

FEATURE_LIMITS = {
    "tutor": 20,
    "course": 10,
    "notes": 15,
    "quiz": 15,
    "lesson": 20,
    "interview": 10,
    "coding": 10,
    "resume": 5,
    "video": 5,
}

def check_ai_limit(
    db: Session,
    user_id: int,
    feature: str
):

    today = date.today()

    usage = (
        db.query(AIUsage)
        .filter(
            AIUsage.user_id == user_id,
            AIUsage.feature == feature
        )
        .first()
    )

    limit = FEATURE_LIMITS[feature]

    if usage is None:

        usage = AIUsage(
            user_id=user_id,
            feature=feature,
            used_count=0,
            daily_limit=limit,
            last_reset=today
        )

        db.add(usage)
        db.commit()
        db.refresh(usage)

    if usage.last_reset != today:

        usage.used_count = 0
        usage.last_reset = today
        usage.daily_limit = limit

        db.commit()
        db.refresh(usage)

    remaining = usage.daily_limit - usage.used_count

    return {
        "allowed": remaining > 0,
        "remaining": remaining,
        "limit": usage.daily_limit
    }
def increase_ai_usage(
    db: Session,
    user_id: int,
    feature: str
):

    usage = (
        db.query(AIUsage)
        .filter(
            AIUsage.user_id == user_id,
            AIUsage.feature == feature
        )
        .first()
    )

    if usage:

        usage.used_count += 1

        db.commit()

        db.refresh(usage)

def get_ai_usage(
    db: Session,
    user_id: int
):

    today = date.today()

    result = {}

    for feature, limit in FEATURE_LIMITS.items():

        usage = (
            db.query(AIUsage)
            .filter(
                AIUsage.user_id == user_id,
                AIUsage.feature == feature
            )
            .first()
        )

        used = 0

        if usage and usage.last_reset == today:
            used = usage.used_count

        result[feature] = {
            "used": used,
            "remaining": limit - used,
            "limit": limit
        }

    return result

from database.models import UserStats


def add_xp(
    db: Session,
    firebase_uid: str,
    xp: int,
    coins: int = 0
):

    stats = db.query(UserStats).filter(
        UserStats.firebase_uid == firebase_uid
    ).first()

    if stats is None:

        stats = UserStats(
            firebase_uid=firebase_uid
        )

        db.add(stats)

        db.commit()

        db.refresh(stats)

    stats.xp += xp

    stats.coins += coins

    stats.level = (stats.xp // 500) + 1

    db.commit()

    db.refresh(stats)

    return stats