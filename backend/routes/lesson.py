from fastapi import APIRouter
from services.gemini_service import get_model
from schemas.lesson import WeekRequest
import json

router = APIRouter()

model = get_model()

    # Generate Weekly Lesson
@router.post("/generate-week")
def generate_week(data: WeekRequest):

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

        text = response.text.strip()

        print("=" * 100)
        print(text)
        print("=" * 100)

        # Remove markdown
        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        lesson = json.loads(text)

        return lesson

    except Exception as e:
        print("JSON ERROR")
        print(text)

        return {
            "error": str(e),
            "raw": text
        }
    