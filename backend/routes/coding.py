from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
import json

from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)

from services.gemini_service import get_model

from schemas.coding import (
    CodingQuestionRequest,
    CodeEvaluationRequest
)

router = APIRouter()

model = get_model()


# ==========================
# Generate Coding Question
# ==========================

@router.post("/generate-coding-question")
def generate_question(
    data: CodingQuestionRequest,
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
You are a FAANG interviewer.

Generate ONE coding interview question.

Topic:
{data.topic}

Difficulty:
{data.difficulty}

Return ONLY valid JSON.

{{
    "title":"Two Sum",
    "difficulty":"Easy",
    "description":"Given an array...",
    "examples":["Input: ... Output: ..."],
    "constraints":["1 <= n <= 100000"]
}}
"""

    try:

        response = model.generate_content(prompt)

        remaining = increase_ai_usage(
            db,
            firebase_uid
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


# ==========================
# Evaluate Code
# ==========================

@router.post("/evaluate-code")
def evaluate_code(
    data: CodeEvaluationRequest,
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
You are a Senior Software Engineer at Google.

Evaluate this coding interview solution.

Topic:
{data.topic}

Programming Language:
{data.language}

Question:
{data.question}

Candidate Code:

{data.code}

Return ONLY valid JSON.

{{
    "score": 8,
    "time_complexity": "O(n)",
    "space_complexity": "O(n)",
    "strengths": [
        "Good use of HashMap"
    ],
    "weaknesses": [
        "Variable names could be clearer"
    ],
    "optimization": "This solution is already optimal."
}}
"""

    try:

        response = model.generate_content(prompt)

        remaining = increase_ai_usage(
            db,
            firebase_uid
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