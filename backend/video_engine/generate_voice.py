from gtts import gTTS
import os


def generate_voice(text, filename):
    os.makedirs("videos/audio", exist_ok=True)

    tts = gTTS(text=text, lang="en")

    path = f"videos/audio/{filename}.mp3"

    tts.save(path)

    return path