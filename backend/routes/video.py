from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import User
from firebase_auth import verify_token

from services.ai_usage_service import (
    check_ai_limit,
    increase_ai_usage
)
from services.stats_service import add_xp

from schemas.video import VideoScriptRequest
from services.gemini_service import get_model
from video_engine.video_pipeline import generate_video_pipeline

router = APIRouter()

model = get_model()


@router.post("/generate-video")
def generate_video(
    data: VideoScriptRequest,
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

    allowed, remaining = check_ai_limit(
        db,
        firebase_uid
    )

    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Daily AI limit reached."
        )

    try:

        result = generate_video_pipeline(
            model,
            data.topic,
            data.week
        )

        remaining = increase_ai_usage(
            db,
            firebase_uid
        )

        add_xp(
            db,
            firebase_uid,
            xp=25,
            ai=1
        )

        result["remaining"] = remaining

        print("========== ROUTE RESULT ==========")
        print(result)
        print("==================================")

        return result

    except Exception as e:

        return {
            "error": str(e)
        }