from fastapi import APIRouter, UploadFile, File
import shutil
import os
import uuid

router = APIRouter()

UPLOAD_FOLDER = "uploads/profile"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-profile-photo")
async def upload_photo(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename or "")[1].lower() or ".jpg"
    filename = f"{uuid.uuid4()}{ext}"
    path = os.path.join(UPLOAD_FOLDER, filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "photo_url": f"https://eduagent-ugdl.onrender.com/uploads/profile/{filename}"
    }
