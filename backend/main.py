from video_engine.generate_voice import generate_voice
from video_engine.generate_script import generate_video_script
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json
from video_engine.generate_voice import generate_voice

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

# FastAPI App
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
# Home Route
@app.get("/")
def home():
    return {"message": "Welcome to EduAgent AI"}


# Generate Course Roadmap
@app.post("/generate-course")
def generate_course(data: CourseRequest):

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


# Ask AI Tutor
@app.post("/ask-doubt")
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


# Generate Quiz
@app.post("/generate-quiz")
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


# Generate Notes
@app.post("/generate-notes")
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
    
    # Generate Weekly Lesson
@app.post("/generate-week")
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