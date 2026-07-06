from pydantic import BaseModel


class InterviewRequest(BaseModel):
    topic: str
    difficulty: str


class EvaluationRequest(BaseModel):
    topic: str
    question: str
    answer: str