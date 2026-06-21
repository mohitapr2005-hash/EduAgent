from video_engine.generate_script import generate_video_script
from video_engine.generate_slide_images import generate_slide_images
from video_engine.generate_voice import generate_voice
from video_engine.video_generator import generate_video

import os

print("🚀 LOADED video_pipeline.py")


def generate_video_pipeline(model, topic, week):

    print("INSIDE generate_video_pipeline")

    video_path = f"courses/{topic.replace(' ', '_')}/Week_{week}/video/lesson.mp4"

    # Create folders automatically
    os.makedirs(os.path.dirname(video_path), exist_ok=True)

    # If video already exists, return it immediately
    if os.path.exists(video_path):
        print("✅ Video already exists. Returning cached video.")

        return {
            "success": True,
            "video": video_path,
            "video_url": f"http://127.0.0.1:8000/{video_path}",
            "cached": True
        }

    print("Generating Script...")

    script = generate_video_script(
        model,
        topic,
        week
    )

    print("✅ Script Generated")

    print("Generating Slides...")

    slides = generate_slide_images(
        script,
        topic,
        week
    )

    print("✅ Slides Generated")

    print("Generating Voice...")

    audio = generate_voice(
        script,
        topic,
        week
    )

    print("✅ Audio Generated")

    print("Generating Video...")

    video = generate_video(
        slides,
        audio,
        video_path
    )

    print("✅ Video Generated")

    response = {
        "success": True,
        "script": script,
        "slides": slides,
        "audio": audio,
        "video": video,
        "video_url": f"http://127.0.0.1:8000/{video}",
        "cached": False
    }

    print(response)

    return response