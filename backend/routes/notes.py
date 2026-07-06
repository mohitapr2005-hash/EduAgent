from fastapi import APIRouter
from services.gemini_service import get_model
from schemas.notes import NotesRequest

router = APIRouter()

model = get_model()


@router.post("/generate-notes")
def generate_notes(data: NotesRequest):

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

        return {
            "notes": response.text
        }

    except Exception as e:

        return {
            "notes": f"Error: {str(e)}"
        }