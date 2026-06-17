from pydantic import BaseModel


class NotesRequest(BaseModel):
    topic: str