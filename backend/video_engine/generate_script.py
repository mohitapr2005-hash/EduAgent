import json
import os


def generate_video_script(model, topic, week):

    lesson_path = f"courses/{topic.replace(' ', '_')}/Week_{week}/lesson.json"

    os.makedirs(os.path.dirname(lesson_path), exist_ok=True)

    # -------------------------------
    # Check Cache
    # -------------------------------
    if os.path.exists(lesson_path):

        print("✅ Lesson already exists. Loading from cache...")

        with open(lesson_path, "r") as f:
            return json.load(f)

    print("🧠 Generating lesson using Gemini...")

    prompt = f"""
You are an expert professor, instructional designer, and educational video creator.

Your task is to create a complete educational lesson for:

Course Topic: {topic}
Week Number: {week}

The lesson should be suitable for first-year university students.

Return ONLY valid JSON.

Requirements:

1. Create 8-12 scenes.
2. Each scene should explain ONE concept only.
3. Use very simple English.
4. Every scene should naturally continue from the previous one.
5. Add real-life examples wherever possible.
6. Narration should sound like a real teacher explaining in class.
7. Bullet points should be short (3-5 bullets only).
8. Each scene duration should be between 20 and 40 seconds.
9. image_prompt should describe an educational illustration or diagram.
10. Do NOT return markdown.
11. Return ONLY JSON.

JSON Format:

{{
    "title":"Lesson Title",
    "estimated_duration":"10 Minutes",
    "learning_objectives":[
        "...",
        "...",
        "..."
    ],
    "scenes":[
        {{
            "scene":1,
            "title":"Introduction",
            "slide_title":"Topic",
            "bullet_points":[
                "...",
                "...",
                "..."
            ],
            "narration":"Narration",
            "image_prompt":"Educational illustration",
            "duration":30
        }}
    ],
    "summary":"Summary",
    "assignment":[
        "...",
        "...",
        "..."
    ]
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1:
        raise Exception("No valid JSON found in Gemini response")

    text = text[start:end + 1]

    lesson = json.loads(text)

    # -------------------------------
    # Save Cache
    # -------------------------------
    with open(lesson_path, "w") as f:
        json.dump(lesson, f, indent=4)

    print("✅ Lesson Saved")

    return lesson