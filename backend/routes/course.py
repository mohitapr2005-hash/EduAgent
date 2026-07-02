from database.database import get_db
from database.models import User, Course
from database.crud import create_course, get_user_courses

from sqlalchemy.orm import Session

from fastapi import APIRouter, Header, HTTPException, Depends

from firebase_auth import verify_token

from schemas.course import CourseRequest

from services.gemini_service import get_model

import json

print("🚀 COURSE ROUTE LOADED")

router = APIRouter()

model = get_model()

print("About to register generate-course")


@router.post("/generate-course")
def generate_course(
    data: CourseRequest,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    print(decoded)

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

    roadmap = json.loads(text)
    course=create_course(
    db=db,
    user_id=user.id,
    title=roadmap["title"],
    description=f"AI generated course on {data.topic}",
    roadmap=roadmap
)
    

    return {
        "course_id": course.id,
        "roadmap": roadmap
    }

@router.get("/my-courses")
def my_courses(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return get_user_courses(
        db,
        user.id
    )

@router.get("/course/{course_id}")
def get_course(
    course_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == firebase_uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    course = db.query(Course).filter(
        Course.id == course_id,
        Course.user_id == user.id
    ).first()

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return json.loads(course.roadmap_json)


print("Course router routes:", router.routes)