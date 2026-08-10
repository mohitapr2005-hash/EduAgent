from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)
from services.gemini_service import get_model
from schemas.tutor import DoubtRequest

router = APIRouter()

model = get_model()


@router.post("/ask-doubt")
def ask_doubt(
    data: DoubtRequest,
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
You are EduAgent AI, a friendly AI tutor for students.

Rules:
- Answer only educational or learning-related questions.
- If the question is about programming, provide code only when the user explicitly asks for code.
- If the question is general, answer normally in simple English.
- Never invent code unnecessarily.
- Explain in a clear, beginner-friendly way.

Student Question:
{data.question}

Response format:

### Explanation
(Explain clearly)

### Example
(Give one simple example if applicable)

### Key Points
- Point 1
- Point 2
- Point 3

### Interview Tip
(Add only if relevant)
"""

    try:
        response = model.generate_content(prompt)
        remaining = increase_ai_usage(
    db,
    firebase_uid
)

        return {
    "answer": response.text,
    "remaining": remaining
}

    except Exception as e:
        return {
            "answer": f"Error: {str(e)}"
        }