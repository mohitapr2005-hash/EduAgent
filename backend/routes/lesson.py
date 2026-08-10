from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
import json

from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.gemini_service import get_model
from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)
from services.stats_service import add_xp

from schemas.lesson import WeekRequest

router = APIRouter()

model = get_model()


@router.post("/generate-week")
def generate_week(
    data: WeekRequest,
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
You are an expert university professor.

Create a COMPLETE lesson for Week {data.week}
of a 12-week course on:

{data.topic}

IMPORTANT RULES:
- Return ONLY JSON.
- No markdown.
- No ```json.
- No explanations before or after JSON.
- Escape all quotation marks inside strings.
- Every key/value must be valid JSON.
- lesson should be plain text only.

Return EXACTLY in this format:

{{
  "title": "Lesson Title",
  "duration": "45 Minutes",
  "learning_outcomes": [
    "Outcome 1",
    "Outcome 2",
    "Outcome 3"
  ],
  "lesson": "Detailed lesson...",
  "examples": [
    "Example 1",
    "Example 2",
    "Example 3"
  ],
  "assignment": [
    "Question 1",
    "Question 2",
    "Question 3"
  ],
  "summary": "Short summary"
}}
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
            xp=20,
            ai=1
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        lesson = json.loads(text)

        lesson["remaining"] = remaining

        return lesson

    except Exception as e:

        return {
            "error": str(e)
        }