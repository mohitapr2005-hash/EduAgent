from video_engine.generate_script import generate_video_script
from video_engine.generate_slide_images import generate_slide_images
from video_engine.generate_voice import generate_voice
from video_engine.video_generator import generate_video

import os


def generate_video_pipeline(model, topic, week):

    video_path = f"courses/{topic.replace(' ', '_')}/Week_{week}/video/lesson.mp4"

    # If video already exists, return it immediately
    if os.path.exists(video_path):
        print("✅ Video already exists. Returning cached video.")

        return {
            "success": True,
            "video": video_path
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
    print(slides)

    print("Generating Voice...")

    audio = generate_voice(
        script,
        topic,
        week
    )

    print("✅ Audio Generated")
    print(audio)

    print("Generating Video...")

    video = generate_video(
        slides,
        audio,
        video_path
    )

    print("✅ Video Generated")
    print(video)

    return {
        "success": True,
        "script": script,
        "slides": slides,
        "audio": audio,
        "video": video
    }