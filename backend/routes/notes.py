from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from services.stats_service import add_xp
from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)
from services.gemini_service import get_model
from schemas.notes import NotesRequest

router = APIRouter()

model = get_model()


@router.post("/generate-notes")
def generate_notes(
    data: NotesRequest,
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

    allowed, remaining = check_ai_limit(
        db,
        firebase_uid
    )

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Daily AI limit reached."
        )

    prompt = f"""
Create concise study notes on {data.topic}.

Include:
- Introduction
- Key Concepts
- Important Points
- Real-world Example
- Interview Questions

Keep it beginner-friendly.
"""

    try:
        response = model.generate_content(prompt)

        remaining = increase_ai_usage(
            db,
            firebase_uid
        )

        add_xp(
    db,
    firebase_uid,
    xp=15,
    ai=1
)

        return {
            "notes": response.text,
            "remaining": remaining
        }
    except Exception as e:
        return {
            "notes": f"Error: {str(e)}"
        }