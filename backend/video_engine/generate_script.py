import google.generativeai as genai
import json


def generate_video_script(model, topic, week):

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

            "slide_title":"What is an Operating System?",

            "bullet_points":[
                "...",
                "...",
                "..."
            ],

            "narration":"A detailed teacher narration of around 120-180 words.",

            "image_prompt":"Flat educational illustration showing a computer interacting with an operating system.",

            "duration":30
        }}

    ],

    "summary":"Summarize the lesson in 150 words.",

    "assignment":[
        "...",
        "...",
        "..."
    ]
}}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    return json.loads(text)