from fastapi import APIRouter

from schemas.study_plan import StudyPlanRequest

from services.gemini_service import get_model

import json

router = APIRouter()

model = get_model()


@router.post("/generate-study-plan")
def generate_plan(data: StudyPlanRequest):

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

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")
        text = text.replace("```", "")

    return json.loads(text)