import os
import shutil
import uuid
from typing import Optional
from fastapi import APIRouter, UploadFile, Form, HTTPException, BackgroundTasks, Depends
from fastapi.responses import JSONResponse

from api.services.whisper import WhisperTranscriptionService
from api.services.gpt_caption import CaptionGenerationService
from api.services.twitter import TwitterService

router = APIRouter()

# Service instantiation
whisper_service = WhisperTranscriptionService()
caption_service = CaptionGenerationService()
twitter_service = TwitterService()

# Storage setup (would be replaced with proper cloud storage in production)
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def process_submission(audio_path: str, caption_hint: Optional[str]):
    """Background task to process audio submission."""
    # TODO: Implement actual processing with DB storage
    pass

@router.post("/audio")
async def submit_audio(
    file: UploadFile,
    background_tasks: BackgroundTasks,
    caption_hint: Optional[str] = Form(None),
    tone: str = Form("cruel")
):
    """
    Submit an audio file for processing.
    
    The audio will be:
    1. Saved to storage
    2. Transcribed using Whisper
    3. Classified by sound type
    4. Caption generated with GPT-4o
    5. Added to the queue for review
    """
    # Validate audio file
    valid_extensions = [".wav", ".mp3", ".ogg", ".m4a"]
    ext = os.path.splitext(file.filename)[1].lower()
    
    if ext not in valid_extensions:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Supported types: {', '.join(valid_extensions)}")
    
    # Generate unique filename and save
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Queue background processing
    background_tasks.add_task(process_submission, file_path, caption_hint)
    
    # Return immediate response while processing happens in background
    return JSONResponse({
        "status": "received",
        "filename": unique_filename,
        "hint": caption_hint,
        "tone": tone,
        "message": "Audio received and being processed"
    })

@router.post("/text")
async def submit_text(
    text: str = Form(...),
    tone: str = Form("cruel")
):
    """Submit text directly for caption generation and queuing."""
    
    # Generate caption based on submitted text
    try:
        caption = await caption_service.generate_caption(
            transcript=text,
            sound_type="text_entry",
            tone=tone
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Caption generation failed: {str(e)}")
    
    # TODO: Add to queue in database
    
    return {
        "status": "received",
        "text": text,
        "caption": caption,
        "tone": tone,
        "message": "Text received and caption generated"
    }

@router.get("/tones")
async def get_tones():
    """Get available caption tone options."""
    return caption_service.get_available_tones()
