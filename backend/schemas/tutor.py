from pydantic import BaseModel


class DoubtRequest(BaseModel):
    question: str