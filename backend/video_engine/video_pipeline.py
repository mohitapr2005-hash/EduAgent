from video_engine.generate_script import generate_video_script
from video_engine.generate_slide_images import generate_slide_images
from video_engine.generate_voice import generate_voice
from video_engine.video_generator import generate_video


def generate_video_pipeline(model, topic, week):

    print("Generating Script...")

    script = generate_video_script(
        model,
        topic,
        week
    )

    print("Generating Slides...")

    slides = generate_slide_images(
    script,
    topic,
    week
)

    print("Generating Voice...")

    audio = generate_voice(
        script["summary"],
        f"{topic}_week{week}"
    )

    print("Generating Video...")

    video_path = generate_video(
        slides,
        audio,
        f"courses/{topic.replace(' ', '_')}/Week_{week}/video/lesson.mp4"
    )

    return {
        "script": script,
        "slides": slides,
        "audio": audio,
        "video": video_path
    }