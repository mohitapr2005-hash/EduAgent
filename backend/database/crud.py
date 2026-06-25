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