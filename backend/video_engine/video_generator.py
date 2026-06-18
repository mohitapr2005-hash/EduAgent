from moviepy import (
    ImageClip,
    AudioFileClip,
    concatenate_videoclips
)

import os


def generate_video(slides, audio_files, output_path):

    clips = []

    for slide, audio in zip(slides, audio_files):

        audio_clip = AudioFileClip(audio)

        clip = (
            ImageClip(slide)
            .with_duration(audio_clip.duration)
            .with_audio(audio_clip)
        )

        clips.append(clip)

    final_video = concatenate_videoclips(
        clips,
        method="compose"
    )

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    final_video.write_videofile(
    output_path,
    fps=5,
    codec="libx264",
    audio_codec="aac"
)

    return output_path