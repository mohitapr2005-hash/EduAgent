from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Profile


router = APIRouter()

from database.models import (
    User,
    Profile,
    Course,
    Progress,
    UserStats,
    ChatHistory,
    AIUsage
)


@router.get("/profile/{uid}")
def get_profile(uid: str, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(
        Profile.firebase_uid == uid
    ).first()

    if not profile:
        return {}

    return {
    "name": profile.full_name,
    "university": profile.university,
    "company": profile.target_company,
    "github": profile.github,
    "linkedin": profile.linkedin,
    "skills": profile.skills,
    "bio": profile.bio,
    "photo_url": profile.photo_url
}


@router.post("/profile/{uid}")
def save_profile(uid: str, data: dict, db: Session = Depends(get_db)):

    profile = db.query(Profile).filter(
        Profile.firebase_uid == uid
    ).first()

    if profile is None:
        profile = Profile(firebase_uid=uid)
        db.add(profile)

    profile.full_name = data.get("name")
    profile.university = data.get("university")
    profile.target_company = data.get("company")
    profile.github = data.get("github")
    profile.linkedin = data.get("linkedin")
    profile.skills = data.get("skills")

    # Add this if you added the bio column to your model.
    if hasattr(profile, "bio"):
        profile.bio = data.get("bio")

    profile.photo_url = data.get("photo_url")

    db.commit()

    return {"success": True, "message": "Profile Saved"}


from firebase_auth import verify_token
from fastapi import Header, HTTPException


@router.delete("/profile/delete")
def delete_account(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    uid = decoded["uid"]

    user = db.query(User).filter(
        User.firebase_uid == uid
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.query(Profile).filter(
        Profile.firebase_uid == uid
    ).delete()

    db.query(UserStats).filter(
        UserStats.firebase_uid == uid
    ).delete()

    db.query(ChatHistory).filter(
        ChatHistory.firebase_uid == uid
    ).delete()

    db.query(AIUsage).filter(
        AIUsage.user_id == user.id
    ).delete()

    db.query(Progress).filter(
        Progress.user_id == user.id
    ).delete()

    db.query(Course).filter(
        Course.user_id == user.id
    ).delete()

    db.delete(user)

    db.commit()

    return {
        "success": True
    }