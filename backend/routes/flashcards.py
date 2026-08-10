from fastapi import APIRouter
import google.generativeai as genai

router = APIRouter()

model = genai.GenerativeModel("gemini-2.5-flash")


@router.post("/generate-flashcards")
def generate_flashcards(data: dict):

    topic = data["topic"]

    prompt = f"""
Create exactly 10 flashcards about {topic}.

Return ONLY valid JSON in this format:

{{
    "flashcards":[
        {{
            "question":"...",
            "answer":"..."
        }}
    ]
}}

Do not write markdown.
Do not write explanations.
"""

    response = model.generate_content(prompt)

    text = response.text

    text = text.replace("```json", "").replace("```", "").strip()

    import json

    return json.loads(text)