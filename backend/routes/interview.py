from fastapi import APIRouter
from services.gemini_service import get_model
from schemas.interview import (
    InterviewRequest,
    EvaluationRequest
)
import json

router = APIRouter()

model = get_model()


@router.post("/generate-interview-question")
def generate_question(data: InterviewRequest):

    prompt = f"""
You are a Senior Software Engineer conducting a technical interview.

Topic:
{data.topic}

Difficulty:
{data.difficulty}

Generate ONE interview question.

Return ONLY valid JSON.

{{
    "question":"..."
}}
"""

    try:

        response = model.generate_content(prompt)

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        return json.loads(text)

    except Exception as e:

        return {
            "error": str(e)
        }


@router.post("/evaluate-answer")
def evaluate_answer(data: EvaluationRequest):

    prompt = f"""
You are a Senior Software Engineer conducting a technical interview.

Topic:
{data.topic}

Current Question:
{data.question}

Candidate Answer:
{data.answer}

Evaluate the answer.

Then ask ONE NEW interview question that naturally follows.

Return ONLY valid JSON.

{{
    "score":8,
    "strengths":[
        "...",
        "..."
    ],
    "weaknesses":[
        "...",
        "..."
    ],
    "ideal_answer":"...",
    "interview_tip":"...",
    "next_question":"..."
}}
"""

    try:

        response = model.generate_content(prompt)

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        return json.loads(text)

    except Exception as e:

        return {
            "error": str(e)
        }