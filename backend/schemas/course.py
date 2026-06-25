from pydantic import BaseModel


class CourseRequest(BaseModel):
    topic: str
    user_id: int