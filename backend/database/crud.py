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
    return (
        db.query(Course)
        .filter(Course.user_id == user_id)
        .order_by(Course.id.desc())
        .all()
    )
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