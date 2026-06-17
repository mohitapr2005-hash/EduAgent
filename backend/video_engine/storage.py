import os


def create_course_structure(topic, week):

    topic = topic.replace(" ", "_")

    base = os.path.join(
        "courses",
        topic,
        f"Week_{week}"
    )

    folders = [
        "slides",
        "audio",
        "images",
        "video",
        "notes",
        "quiz"
    ]

    for folder in folders:
        os.makedirs(
            os.path.join(base, folder),
            exist_ok=True
        )

    return base