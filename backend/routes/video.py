from fastapi import APIRouter
from schemas.video import VideoScriptRequest
from services.gemini_service import get_model
from video_engine.generate_script import generate_video_script

router = APIRouter()

model = get_model()


@router.post("/generate-video")
def generate_video(data: VideoScriptRequest):

    script = generate_video_script(
        model,
        data.topic,
        data.week
    )

    return {
        "success": True,
        "script": script
    }