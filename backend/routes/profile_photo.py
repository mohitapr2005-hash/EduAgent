
from fastapi import APIRouter, UploadFile, File
import shutil
import os
import uuid



router = APIRouter()

UPLOAD_FOLDER = "uploads/profile"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-profile-photo")
async def upload_photo(file: UploadFile = File(...)):

    ext = file.filename.split(".")[-1]

    filename = f"{uuid.uuid4()}.{ext}"

    path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "photo_url":
        f"http://127.0.0.1:8000/uploads/profile/{filename}"
    }