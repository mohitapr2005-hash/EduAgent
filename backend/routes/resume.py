from fastapi import APIRouter, UploadFile, File
from services.resume_service import extract_resume_text
from services.gemini_service import get_model
import json
import os

router = APIRouter()

model = get_model()


@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):

    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_resume_text(temp_path)

    os.remove(temp_path)

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze this resume.

Resume:

{resume_text}

Return ONLY valid JSON.

{{
    "ats_score":85,
    "skills":[
        "Java",
        "SQL"
    ],
    "missing_skills":[
        "Docker",
        "AWS"
    ],
    "suggestions":[
        "Improve project descriptions",
        "Add measurable achievements",
        "Mention technical keywords"
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

        return json.loads(text)

    except Exception as e:

        return {
            "error": str(e)
        }