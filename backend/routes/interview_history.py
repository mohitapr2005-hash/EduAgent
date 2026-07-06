from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User, Interview

from firebase_auth import verify_token
from schemas.interview_history import SaveInterviewRequest

router = APIRouter()


@router.post("/save-interview")
def save_interview(
    data: SaveInterviewRequest,
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

    interview = Interview(
        user_id=user.id,
        topic=data.topic,
        score=data.score,
        feedback=data.feedback
    )

    db.add(interview)

    db.commit()

    return {
        "success": True
    }