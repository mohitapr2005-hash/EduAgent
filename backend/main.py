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

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class CourseRequest(BaseModel):
    topic: str


@app.get("/")
def home():
    return {"message": "Welcome to EduAgent AI"}


@app.post("/generate-course")
def generate_course(data: CourseRequest):

    prompt = f"""
Create a learning roadmap for {data.topic}.

Return ONLY valid JSON in this exact format:

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

        # Remove markdown if Gemini returns it
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        roadmap = json.loads(text)

        return roadmap

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }