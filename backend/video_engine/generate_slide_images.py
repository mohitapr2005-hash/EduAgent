from PIL import Image, ImageDraw, ImageFont
import os

WIDTH = 960
HEIGHT = 540


def generate_slide_images(script, topic, week):

    folder = os.path.join(
        "courses",
        topic.replace(" ", "_"),
        f"Week_{week}",
        "slides"
    )

    os.makedirs(folder, exist_ok=True)

    files = []

    try:
        title_font = ImageFont.truetype("Arial.ttf", 42)
        body_font = ImageFont.truetype("Arial.ttf", 28)
    except:
        title_font = ImageFont.load_default()
        body_font = ImageFont.load_default()

    for scene in script["scenes"]:

        img = Image.new("RGB", (WIDTH, HEIGHT), "#0f172a")
        draw = ImageDraw.Draw(img)

        draw.text(
            (60, 40),
            scene["slide_title"],
            fill="white",
            font=title_font
        )

        y = 140

        for point in scene["bullet_points"]:

            draw.text(
                (80, y),
                f"• {point}",
                fill="white",
                font=body_font
            )

            y += 60

        filename = os.path.join(
            folder,
            f"slide_{scene['scene']}.png"
        )

        img.save(filename)

        files.append(filename)

    return files