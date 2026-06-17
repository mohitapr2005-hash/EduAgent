from pydantic import BaseModel


class VoiceRequest(BaseModel):
    text: str
    filename: str


class VideoScriptRequest(BaseModel):
    topic: str
    week: int


class SlidesRequest(BaseModel):
    topic: str
    week: int