from moviepy import ImageClip, AudioFileClip, concatenate_videoclips
import os


def generate_video(slides, audio, output_path):

    audio_clip = AudioFileClip(audio)

    duration_per_slide = audio_clip.duration / len(slides)

    clips = []

    for slide in slides:

        clip = (
            ImageClip(slide)
            .with_duration(duration_per_slide)
        )

        clips.append(clip)

    final_video = concatenate_videoclips(clips)

    final_video = final_video.with_audio(audio_clip)

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    final_video.write_videofile(
        output_path,
        fps=24
    )

    return output_path