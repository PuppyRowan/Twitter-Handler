#!/usr/bin/env python3
"""
Test script for Twilio SMS integration

This script simulates a Twilio webhook request to test SMS processing.
"""

import argparse
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def simulate_twilio_webhook(
    api_url: str = "http://localhost:8000/sms/webhook",
    phone_number: str = "+15551234567",
    message: str = "Please use me, I need to be exposed",
):
    """
    Simulate a Twilio webhook request.
    
    Args:
        api_url: URL for the SMS webhook endpoint
        phone_number: Phone number to simulate the message from
        message: Message content
    """
    # These are the form fields Twilio would send
    data = {
        "From": phone_number,
        "Body": message,
        "To": os.environ.get("TWILIO_PHONE_NUMBER", "+15557654321"),
        "MessageSid": "SM" + "1" * 32,
    }
    
    # In a real webhook, Twilio would sign the request
    # But our validation will pass in development mode
    
    # Send the request
    try:
        response = requests.post(api_url, data=data)
        print(f"Status code: {response.status_code}")
        print(f"Response:")
        print(response.text)
        return response
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Test Twilio SMS webhooks')
    parser.add_argument('--url', '-u', default='http://localhost:8000/sms/webhook',
                        help='API URL (default: http://localhost:8000/sms/webhook)')
    parser.add_argument('--phone', '-p', default='+15551234567',
                        help='Phone number to simulate (default: +15551234567)')
    parser.add_argument('--message', '-m', default="Please use me, I need to be exposed",
                        help='Message to send')

    args = parser.parse_args()
    
    simulate_twilio_webhook(args.url, args.phone, args.message)

if __name__ == "__main__":
    main()