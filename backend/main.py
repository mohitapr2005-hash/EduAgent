from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json

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