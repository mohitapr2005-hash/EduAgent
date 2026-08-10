from fastapi import APIRouter, UploadFile, File, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)

from services.stats_service import add_xp
from services.resume_service import extract_resume_text
from services.gemini_service import get_model

import json
import os

router = APIRouter()

model = get_model()


@router.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
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
    # AI Limit Check
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
    # Save Resume
    # ==========================

    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_resume_text(temp_path)

    os.remove(temp_path)

    # ==========================
    # Gemini Prompt
    # ==========================

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze this resume.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
    "ats_score": 85,
    "skills": [
        "Java",
        "SQL"
    ],
    "missing_skills": [
        "Docker",
        "AWS"
    ],
    "suggestions": [
        "Improve project descriptions",
        "Add measurable achievements",
        "Mention technical keywords"
    ]
}}
"""

    try:

        response = model.generate_content(prompt)

        # AI Usage Increase
        remaining = increase_ai_usage(
            db,
            firebase_uid
        )

        # XP
        add_xp(
    db,
    firebase_uid,
    xp=20,
    resume_checks=1
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