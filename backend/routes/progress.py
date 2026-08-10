from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database.models import User, Progress

from database.database import get_db

from database.crud import save_progress

from firebase_auth import verify_token
from schemas.progress import ProgressRequest

router = APIRouter()


@router.post("/complete-week")
def complete_week(
    data: ProgressRequest,
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

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    save_progress(
        db=db,
        user_id=user.id,
        course_id=data.course_id,
        completed_week=data.completed_week
    )

    return {
        "success": True
    }



@router.get("/progress/{course_id}")
def get_progress(
    course_id: int,
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

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    progress = (
        db.query(Progress)
        .filter(
            Progress.user_id == user.id,
            Progress.course_id == course_id
        )
        .first()
    )

    if progress is None:
        return {
            "completed_week": 0
        }

    return {
        "completed_week": progress.completed_week
    }