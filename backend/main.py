import firebase_admin_config
from database.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from routes.progress import router as progress_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from video_engine.generate_voice import generate_voice
from video_engine.generate_script import generate_video_script
from video_engine.generate_slides import generate_slides
from services.gemini_service import get_model
from routes.auth import router as auth_router
from routes.course import router as course_router
from routes.video import router as video_router
from routes.certificate import router as certificate_router
from routes.study_plan import router as study_plan_router
from routes.dashboard import router as dashboard_router
from routes.continue_learning import router as continue_learning_router
from routes.tutor import router as tutor_router
from routes.quiz import router as quiz_router
from routes.notes import router as notes_router
from routes.lesson import router as lesson_router
from routes.interview import router as interview_router
from routes.interview_history import router as interview_history_router
from routes.interview_history_view import router as interview_history_view_router
from routes.resume import router as resume_router
from routes.coding import router as coding_router
from routes.profile import router as profile_router
from routes.profile_photo import router as profile_photo_router
from routes.stats import router as stats_router
from routes.chat_history import router as chat_router
from routes.flashcards import router as flashcard_router
from routes.analytics import router as analytics_router
from routes.ai_usage import router as ai_usage_router
import os


import json

model = get_model()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://edu-agent.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/courses",
    StaticFiles(directory=os.path.join(os.path.dirname(__file__), "courses")),
    name="courses"
)

app.mount(
    "/uploads",
    StaticFiles(directory=os.path.join(os.path.dirname(__file__), "uploads")),
    name="uploads"
)

app.include_router(course_router)
print("✅ Course router included")

app.include_router(video_router)
print("✅ Video router included")

app.include_router(ai_usage_router)

app.include_router(auth_router)
app.include_router(progress_router)
app.include_router(profile_router)
app.include_router(certificate_router)
app.include_router(study_plan_router)
app.include_router(dashboard_router)
app.include_router(quiz_router)
app.include_router(continue_learning_router)
app.include_router(tutor_router)
app.include_router(notes_router)
app.include_router(lesson_router)
app.include_router(interview_router)
app.include_router(interview_history_router)
app.include_router(interview_history_view_router)
app.include_router(resume_router)
app.include_router(coding_router)
app.include_router(profile_photo_router)
app.include_router(stats_router)
app.include_router(chat_router)
app.include_router(flashcard_router)
app.include_router(analytics_router)



# CORS

# Request Models
class CourseRequest(BaseModel):
    topic: str


class DoubtRequest(BaseModel):
    question: str


class QuizRequest(BaseModel):
    topic: str


class NotesRequest(BaseModel):
    topic: str

class WeekRequest(BaseModel):
    topic: str
    week: int

class VoiceRequest(BaseModel):
    text: str
    filename: str

class VideoScriptRequest(BaseModel):
    topic: str
    week: int

class SlidesRequest(BaseModel):
    topic: str
    week: int
# Home Route
@app.get("/")
def home():
    return {"message": "Welcome to EduAgent AI"}


# Generate Course Roadmap
#@app.post("/generate-course")
#def generate_course(data: CourseRequest):
    prompt = f"""
You are an educational roadmap generator.

First determine whether "{data.topic}" is a learnable subject, technology,
programming language, academic topic, certification, or professional skill.

If it is NOT a learnable topic, return ONLY this JSON:

{{
  "error": "Please enter a valid learning topic"
}}

If it IS a learnable topic, return ONLY valid JSON in this format:

{{
  "title": "{data.topic}",
  "duration": "8 Weeks",
  "weeks": [
    {{
      "week": 1,
      "topics": ["Introduction", "Basics"]
    }},
    {{
      "week": 2,
      "topics": ["Intermediate Concepts"]
    }}
  ],
  "projects": [
    "Project 1",
    "Project 2"
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

        result = json.loads(text)

        return result

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
@app.post("/generate-audio")
def generate_audio(data: VoiceRequest):

    try:

        audio_path = generate_voice(
            data.text,
            data.filename
        )

        return {
            "success": True,
            "audio": audio_path
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }
    
@app.post("/generate-video-script")
def generate_video(data: VideoScriptRequest):

    try:

        script = generate_video_script(
            model,
            data.topic,
            data.week
        )

        return script

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }
    

@app.post("/generate-slides")
def generate_ppt(data: SlidesRequest):

    try:

        script = generate_video_script(
            model,
            data.topic,
            data.week
        )

        ppt = generate_slides(
            script,
            data.topic,
            data.week
        )

        return {
            "success": True,
            "ppt": ppt
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }
    
print("\n========== REGISTERED ROUTES ==========")

for route in app.routes:
    print(route.path)

print("=======================================\n")