from fastapi import APIRouter, Request, Form, HTTPException, Depends, BackgroundTasks
from fastapi.responses import PlainTextResponse
from typing import Optional
import os
from datetime import datetime

from api.services.twilio_service import TwilioService
from api.services.gpt_caption import CaptionGenerationService

# Get service instances
twilio_service = TwilioService()
caption_service = CaptionGenerationService()

router = APIRouter()

# Whitelist of approved phone numbers (for security)
APPROVED_NUMBERS = os.environ.get("APPROVED_PHONE_NUMBERS", "").split(",")

# For development, allow all numbers if not configured
if not any(APPROVED_NUMBERS):
    print("WARNING: No approved phone numbers configured, all numbers will be accepted")

@router.post("/webhook", response_class=PlainTextResponse)
async def sms_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
    From: str = Form(...),  # Phone number that sent the message
    Body: str = Form(...),  # Message content
    To: Optional[str] = Form(None),  # Phone number that received the message
    MessageSid: Optional[str] = Form(None)  # Twilio message ID
):
    """
    Handle incoming SMS messages from Twilio.
    
    This endpoint receives SMS messages and processes them for the queue.
    """
    # Validate that the request is from Twilio
    if not await twilio_service.validate_webhook(request):
        raise HTTPException(status_code=403, detail="Invalid Twilio signature")
    
    # Check if the sender is in the whitelist (when configured)
    if APPROVED_NUMBERS and APPROVED_NUMBERS[0] and From not in APPROVED_NUMBERS:
        # We respond with TwiML to send a rejection message
        return PlainTextResponse(
            content=(
                "<?xml version='1.0' encoding='UTF-8'?>"
                "<Response>"
                "<Message>Sorry, your number is not authorized to use this service.</Message>"
                "</Response>"
            ),
            media_type="application/xml"
        )
    
    # Process the incoming message
    try:
        # Generate caption from the text
        caption = await caption_service.generate_caption(
            transcript=Body,
            sound_type="sms_entry",
            tone="cruel"  # Default tone for SMS submissions
        )
        
        # TODO: Store in database
        # This would be implemented to store the message in your database queue
        # background_tasks.add_task(store_sms_in_queue, From, Body, caption)
        
        # Respond with TwiML to confirm receipt
        return PlainTextResponse(
            content=(
                "<?xml version='1.0' encoding='UTF-8'?>"
                "<Response>"
                "<Message>Your submission has been received and will be reviewed. The generated caption is: "
                f"{caption}</Message>"
                "</Response>"
            ),
            media_type="application/xml"
        )
    except Exception as e:
        # Log the error and respond with error message
        print(f"Error processing SMS: {str(e)}")
        return PlainTextResponse(
            content=(
                "<?xml version='1.0' encoding='UTF-8'?>"
                "<Response>"
                "<Message>An error occurred while processing your submission. Please try again later.</Message>"
                "</Response>"
            ),
            media_type="application/xml"
        )

@router.post("/notify")
async def send_notification(
    phone_number: str,
    message: str,
    background_tasks: BackgroundTasks
):
    """
    Send a notification SMS to a user.
    
    This endpoint can be used to notify users about status changes or posted content.
    """
    # Background send to not block the API response
    background_tasks.add_task(twilio_service.send_sms, phone_number, message)
    
    return {"status": "notification queued"}