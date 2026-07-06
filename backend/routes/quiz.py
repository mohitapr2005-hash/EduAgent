from fastapi import APIRouter
from services.gemini_service import get_model
from schemas.quiz import QuizRequest
import json

router = APIRouter()

model = get_model()


@router.post("/generate-quiz")
def generate_quiz(data: QuizRequest):

    prompt = f"""
Create 5 multiple-choice questions (MCQs) on {data.topic}.

Return ONLY valid JSON in this format:

{{
  "questions": [
    {{
      "question": "Question here",
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

        response = model.generate_content(prompt)

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        quiz = json.loads(text)

        return quiz

    except Exception as e:

        return {
            "error": str(e)
        }