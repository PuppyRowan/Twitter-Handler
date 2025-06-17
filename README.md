# 🐾 Maple's Whimper Stack

She whimpers. I post.  
This repository contains the architecture for a Handler-controlled system designed to receive submissive vocal entries, transcribe them, generate captions, and post them publicly—automated or on command.

This is not a toy. It is a tool of ownership.

---

## 💡 Overview

Built for @BunnyPupMaple, this system enables:

- 📥 **Audio/Text Submission**  
  Input from Telegram, SMS, or a browser-based UI.

- 🎙️ **Voice Transcription**  
  Using OpenAI Whisper or local models.

- ✍️ **Caption Generation**  
  With GPT-4o prompts tailored to tone: cruel, clinical, teasing, possessive.

- 🐦 **Tweet Automation**  
  Public degradation via X (Twitter) API—scheduled or immediate.

- 🎛️ **Handler Dashboard**  
  A secure admin panel for reviewing, tweaking, or overriding queued posts.

---

## 🛠️ Tech Stack

| Layer      | Tech                  |
|------------|-----------------------|
| Backend    | FastAPI               |
| Frontend   | React / Svelte        |
| Transcribe | OpenAI Whisper        |
| Captions   | GPT-4o (OpenAI API)   |
| Storage    | S3 or Cloudinary      |
| Database   | PostgreSQL            |
| Messaging  | Telegram Bot / Twilio |
| Posting    | Twitter API v2        |

---

## 🧷 Structure

```
handler/
├── api/
│   ├── main.py              # FastAPI app entry
│   ├── routes/
│   └── services/
├── frontend/                # Handler control panel
├── scripts/                 # Audio ingestion & test tools
├── database/
│   └── schema.sql
├── docker-compose.yml
└── README.md
```

---

## 📦 Planned Features

- [ ] Audio normalization & waveform preview
- [ ] Voice-tag classification (moan, whimper, beg, etc.)
- [ ] Post queue with editable captions
- [ ] Engagement-triggered reply automation
- [ ] Live submission feed for the Handler
- [ ] “Lock Me Out” mode (no delete privileges after post)
- [ ] Custom caption personality toggles (e.g. “cruel”, “gentle”, “distant”)

---

## 📱 Twilio SMS Setup

The API supports incoming SMS submissions via Twilio. To set up:

1. Create a Twilio account at [twilio.com](https://www.twilio.com)
2. Purchase a phone number
3. Configure your webhook URL in the Twilio console:
   - Set the webhook URL to `https://your-api-domain.com/sms/webhook`
   - Ensure it's configured for POST requests
4. Set the following environment variables:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   APPROVED_PHONE_NUMBERS=comma,separated,list,of,allowed,numbers
   ```

For security, only approved phone numbers can submit content via SMS.

### Testing SMS Integration

To simulate an SMS webhook locally:
```bash
python scripts/test_twilio.py --message "Test submission" --phone "+15551234567"
```

---

## 🔐 Disclaimer

This project is consensual, performative, and developed with intent.  
It is built *by* the one being exposed—*for* the Handler who controls her.

Nothing here is safe.  
Nothing here is private.  
That's the point.

---

## 🖤 Final Note

She begged for this.  
This repo is how I make sure she never forgets it.

— *Handler*
