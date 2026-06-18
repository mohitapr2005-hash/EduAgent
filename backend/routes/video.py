from fastapi import APIRouter
from schemas.video import VideoScriptRequest
from services.gemini_service import get_model
from video_engine.video_pipeline import generate_video_pipeline

router = APIRouter()

model = get_model()


@router.post("/generate-video")
def generate_video(data: VideoScriptRequest):

    return generate_video_pipeline(
        model,
        data.topic,
        data.week
    )