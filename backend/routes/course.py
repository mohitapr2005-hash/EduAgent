
from fastapi import APIRouter
from schemas.course import CourseRequest
from services.gemini_service import get_model
print("🚀 COURSE ROUTE LOADED")

router = APIRouter()

model = get_model()

print("About to register generate-course")
@router.post("/generate-course")
def generate_course(data: CourseRequest):

    prompt = f"""
Create a 10-week roadmap for:

{data.topic}

Return ONLY valid JSON:

{{
  "title":"Course Title",
  "duration":"10 Weeks",
  "weeks":[
    {{
      "week":1,
      "title":"Week Title",
      "topics":["Topic1","Topic2"]
    }}
  ],
  "projects":[]
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    import json
    return json.loads(text)

print("Course router routes:", router.routes)