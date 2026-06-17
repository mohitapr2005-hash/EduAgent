from pydantic import BaseModel


class WeekRequest(BaseModel):
    topic: str
    week: int