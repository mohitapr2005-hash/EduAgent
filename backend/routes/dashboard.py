from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, Course, Progress

from firebase_auth import verify_token

router = APIRouter()


@router.get("/dashboard")
def dashboard(
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

    courses_created = db.query(Course).filter(
        Course.user_id == user.id
    ).count()

    progress = db.query(Progress).filter(
        Progress.user_id == user.id
    ).all()

    completed_weeks = sum(
        p.completed_week for p in progress
    )

    certificates = sum(
        1 for p in progress
        if p.completed_week >= 10
    )

    return {
        "courses_created": courses_created,
        "certificates": certificates,
        "completed_weeks": completed_weeks,
        "quizzes_attempted": 0,
        "notes_generated": 0,
        "videos_generated": 0
    }