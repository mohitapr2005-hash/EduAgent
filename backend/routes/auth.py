from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


class LoginRequest(BaseModel):
    firebase_uid: str
    email: str
    name: str


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.firebase_uid == data.firebase_uid
    ).first()

    if not user:

        user = User(
            firebase_uid=data.firebase_uid,
            email=data.email,
            name=data.name
        )

        db.add(user)

    else:
        # Update latest information every login
        user.email = data.email
        user.name = data.name

    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "user_id": user.id,
        "email": user.email,
        "name": user.name
    }