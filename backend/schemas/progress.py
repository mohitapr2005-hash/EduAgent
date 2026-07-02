from pydantic import BaseModel

class ProgressRequest(BaseModel):
    course_id: int
    completed_week: int