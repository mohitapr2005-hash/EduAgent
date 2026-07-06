from fastapi import APIRouter
from services.gemini_service import get_model
from schemas.tutor import DoubtRequest

router = APIRouter()

model = get_model()


@router.post("/ask-doubt")
def ask_doubt(data: DoubtRequest):

    prompt = f"""
Explain the following concept in a simple way for a B.Tech student:

{data.question}

Include:
- Simple explanation
- Example
- Interview tip
"""

    try:

        response = model.generate_content(prompt)

        return {
            "answer": response.text
        }

    except Exception as e:

        return {
            "answer": f"Error: {str(e)}"
        }