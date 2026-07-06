from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, Course, Progress
from firebase_auth import verify_token

router = APIRouter()


@router.get("/continue-learning")
def continue_learning(
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

    user = db.query(User).filter(
        User.firebase_uid == decoded["uid"]
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    progress = (
        db.query(Progress)
        .filter(
            Progress.user_id == user.id
        )
        .order_by(
            Progress.last_opened.desc()
        )
        .first()
    )

    if progress is None:
        return {
            "course": None
        }

    course = (
        db.query(Course)
        .filter(
            Course.id == progress.course_id
        )
        .first()
    )

    return {
        "course_id": course.id,
        "title": course.title,
        "completed_week": progress.completed_week,
        "next_week": progress.completed_week + 1
    }