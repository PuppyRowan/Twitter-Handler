import os
from typing import Optional, Dict, Any
from twilio.rest import Client
from twilio.request_validator import RequestValidator
from fastapi import Request, HTTPException

class TwilioService:
    def __init__(
        self,
        account_sid: Optional[str] = None,
        auth_token: Optional[str] = None,
        phone_number: Optional[str] = None
    ):
        """
        Initialize the Twilio SMS service.
        
        Args:
            account_sid: Twilio account SID
            auth_token: Twilio auth token
            phone_number: Twilio phone number to send from
        """
        self.account_sid = account_sid or os.environ.get("TWILIO_ACCOUNT_SID")
        self.auth_token = auth_token or os.environ.get("TWILIO_AUTH_TOKEN")
        self.phone_number = phone_number or os.environ.get("TWILIO_PHONE_NUMBER")
        
        if not all([self.account_sid, self.auth_token, self.phone_number]):
            # In development, just warn but allow the service to be created
            print("WARNING: Twilio credentials not fully configured")
        else:
            self.client = Client(self.account_sid, self.auth_token)
            self.validator = RequestValidator(self.auth_token)
    
    async def send_sms(self, to_number: str, message: str) -> Dict[str, Any]:
        """
        Send an SMS message via Twilio.
        
        Args:
            to_number: The recipient's phone number
            message: The message to send
            
        Returns:
            dict: Response with message SID and status
        """
        if not all([self.account_sid, self.auth_token, self.phone_number]):
            # Development mock response
            return {
                "sid": "SM12345678901234567890123456789012",
                "status": "queued",
                "to": to_number,
                "from_": self.phone_number or "+15551234567",
                "body": message
            }
            
        # Send actual SMS in production
        message = self.client.messages.create(
            body=message,
            from_=self.phone_number,
            to=to_number
        )
        
        return {
            "sid": message.sid,
            "status": message.status,
            "to": message.to,
            "from_": message.from_,
            "body": message.body
        }
    
    async def validate_webhook(self, request: Request) -> bool:
        """
        Validate that an incoming webhook request is from Twilio.
        
        Args:
            request: The FastAPI request object
            
        Returns:
            bool: True if the request is valid
        """
        if not self.auth_token:  # Skip validation in development
            return True
            
        # Get the URL and form data
        url = str(request.url)
        form_data = await request.form()
        
        # Get the Twilio signature from headers
        signature = request.headers.get("X-Twilio-Signature", "")
        
        # Convert form data to dict for validator
        form_dict = dict(form_data)
        
        return self.validator.validate(url, form_dict, signature)