from database.database import get_db
from database.models import User, Course
from database.crud import create_course, get_user_courses
from services.stats_service import add_xp

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)

from sqlalchemy.orm import Session

from fastapi import APIRouter, HTTPException, Depends

from dependencies.auth import get_current_user

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
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    firebase_uid = user.firebase_uid

    allowed, remaining = check_ai_limit(
        db,
        firebase_uid
    )

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Daily AI limit reached."
        )

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
    course = create_course(
        db=db,
        user_id=user.id,
        title=roadmap["title"],
        description=f"AI generated course on {data.topic}",
        roadmap=roadmap
    )

    remaining = increase_ai_usage(
    db,
    firebase_uid
)

    add_xp(
        db,
        user.firebase_uid,
        xp=50,
        coins=5,
        courses=1
    )

    return {
    "course_id": course.id,
    "roadmap": roadmap,
    "remaining": remaining
}

@router.get("/my-courses")
def my_courses(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return get_user_courses(
        db,
        user.id
    )

@router.get("/course/{course_id}")
def get_course(
    course_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

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
@router.delete("/course/{course_id}")
def delete_course(
    course_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    course = db.query(Course).filter(
        Course.id == course_id,
        Course.user_id == user.id
    ).first()

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    db.delete(course)
    db.commit()

    return {
        "message": "Course Deleted Successfully"
    }
