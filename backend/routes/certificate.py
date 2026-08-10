from fastapi import APIRouter, Depends, Header, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import User, Course, Progress
from firebase_auth import verify_token
from services.certificate_service import generate_certificate

router = APIRouter()

@router.get("/certificate/{course_id}")
def download_certificate(
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
    progress = db.query(Progress).filter(
        Progress.course_id == course.id,
        Progress.user_id == user.id
    ).first()
    if progress is None or progress.completed_week < 10:
        raise HTTPException(
            status_code=400,
            detail="Complete the course first."
        )
    
    print("User Name =", user.name)
    print("Email =", user.email)
    filepath = generate_certificate(
    student_name=user.name,
    course_name=course.title
)
    return FileResponse(
        filepath,
        media_type="application/pdf",
        filename="certificate.pdf"
    )