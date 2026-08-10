from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)

from services.stats_service import add_xp
from services.gemini_service import get_model
from schemas.study_plan import StudyPlanRequest

import json

router = APIRouter()

model = get_model()


@router.post("/generate-study-plan")
def generate_plan(
    data: StudyPlanRequest,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    # ==========================
    # Authentication
    # ==========================

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

    # ==========================
    # AI Daily Limit
    # ==========================

    allowed, remaining = check_ai_limit(
        db,
        firebase_uid
    )

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Daily AI limit reached."
        )

    # ==========================
    # Prompt
    # ==========================

    prompt = f"""
Create a personalized study plan.

Topic:
{data.topic}

Hours per day:
{data.hours_per_day}

Target days:
{data.target_days}

Return ONLY valid JSON.

Example:

{{
    "days":[
        {{
            "day":1,
            "title":"Operating System Basics",
            "tasks":[
                "Read lesson",
                "Watch video",
                "Take notes"
            ]
        }}
    ]
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

        if text.startswith("```json"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        result = json.loads(text)

        result["remaining"] = remaining

        return result

    except Exception as e:

        return {
            "error": str(e)
        }