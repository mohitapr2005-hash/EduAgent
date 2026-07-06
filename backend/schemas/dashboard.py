from pydantic import BaseModel


class DashboardResponse(BaseModel):
    courses_created: int
    certificates: int
    completed_weeks: int
    quizzes_attempted: int
    notes_generated: int
    videos_generated: int