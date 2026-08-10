from pydantic import BaseModel


class CodingQuestionRequest(BaseModel):

    topic: str

    difficulty: str


class CodeEvaluationRequest(BaseModel):

    topic: str

    question: str

    code: str

    language: str