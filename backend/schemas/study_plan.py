from pydantic import BaseModel


class StudyPlanRequest(BaseModel):
    topic: str
    hours_per_day: int
    target_days: int