import google.generativeai as genai
import json


def generate_video_script(model, topic, week):

    prompt = f"""
You are an expert university professor.

Create a YouTube-style educational lesson for:

Topic: {topic}

Week: {week}

Return ONLY valid JSON.

Format:

{{
    "title":"Lesson Title",

    "scenes":[

        {{
            "scene":1,
            "heading":"Introduction",
            "narration":"Teacher narration...",
            "slide":"Short slide text",
            "image_prompt":"Educational illustration"
        }},

        {{
            "scene":2,
            "heading":"Main Concept",
            "narration":"Teacher narration...",
            "slide":"Important points",
            "image_prompt":"Diagram prompt"
        }}

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