from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from firebase_auth import verify_token

from database.crud import (
    save_chat,
    get_chat_history,
    get_chat,
    delete_chat
)

router = APIRouter()


@router.post("/chat")
def save_chat_api(
    data: dict,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    chat = save_chat(
        db=db,
        firebase_uid=firebase_uid,
        question=data["question"],
        answer=data["answer"]
    )

    return {
        "success": True,
        "id": chat.id
    }


@router.get("/chat")
def get_history_api(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    chats = get_chat_history(
        db=db,
        firebase_uid=firebase_uid
    )

    return chats

@router.get("/chat/{chat_id}")
def get_chat_api(
    chat_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    chat = get_chat(
        db=db,
        chat_id=chat_id,
        firebase_uid=firebase_uid
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return chat

@router.delete("/chat/{chat_id}")
def delete_chat_api(
    chat_id: int,
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    token = authorization.replace("Bearer ", "")

    decoded = verify_token(token)

    firebase_uid = decoded["uid"]

    chat = delete_chat(
        db=db,
        chat_id=chat_id,
        firebase_uid=firebase_uid
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return {
        "success": True
    }