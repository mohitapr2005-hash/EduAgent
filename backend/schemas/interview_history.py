from pydantic import BaseModel


class SaveInterviewRequest(BaseModel):
    topic: str
    score: int
    feedback: str