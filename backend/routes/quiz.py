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
from schemas.quiz import QuizRequest
import json

router = APIRouter()

model = get_model()


@router.post("/generate-quiz")
def generate_quiz(
    data: QuizRequest,
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
You are EduAgent AI.

Generate exactly 5 multiple choice questions on the topic:

{data.topic}

Rules:
- Return ONLY valid JSON.
- Do NOT write any explanation.
- Do NOT use markdown.
- Do NOT wrap the response inside ```json.
- Every question must have exactly 4 options.
- The answer must exactly match one of the options.

Return in this format:

{{
  "questions": [
    {{
      "question": "Question",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer": "Option A"
    }}
  ]
}}
"""

    try:
        print("=" * 50)
        print("Generating quiz on:", data.topic)

        response = model.generate_content(prompt)

        print("Gemini Response Received")

        text = response.text.strip()

        print(text)

        # Remove markdown if Gemini returns it
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        quiz = json.loads(text)

        remaining = increase_ai_usage(
            db,
            firebase_uid
        )
        add_xp(
    db,
    firebase_uid,
    xp=20,
    quizzes=1
)

        if "questions" not in quiz:
            return {
                "error": "Invalid response from AI"
            }

        print("Quiz Generated Successfully")

        quiz["remaining"] = remaining

        return quiz

    except json.JSONDecodeError as e:

        print("JSON Error:", e)

        return {
            "error": "AI returned invalid JSON",
            "raw_response": text
        }

    except Exception as e:

        print("Quiz Error:", e)

        return {
            "error": str(e)
        }