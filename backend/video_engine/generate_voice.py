from gtts import gTTS
import os


def generate_voice(script, topic, week):

    folder = os.path.join(
        "courses",
        topic.replace(" ", "_"),
        f"Week_{week}",
        "audio"
    )

    os.makedirs(folder, exist_ok=True)

    audio_files = []

    for scene in script["scenes"]:

        filename = os.path.join(
            folder,
            f"scene_{scene['scene']}.mp3"
        )

        # ✅ Cache Check
        if os.path.exists(filename):
            print(f"🎤 Using cached audio: {filename}")
            audio_files.append(filename)
            continue

        print(f"🎤 Generating audio for Scene {scene['scene']}")

        tts = gTTS(
            text=scene["narration"],
            lang="en"
        )

        tts.save(filename)

        audio_files.append(filename)

    return audio_files