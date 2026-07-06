from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):

    ats_score: int

    skills: list[str]

    missing_skills: list[str]

    suggestions: list[str]