import os
from typing import Optional, List

# In production:
# import openai

class CaptionGenerationService:
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the GPT caption generation service.
        
        Args:
            api_key: Optional OpenAI API key. If not provided, will check for OPENAI_API_KEY env var.
        """
        self.api_key = api_key or os.environ.get("OPENAI_API_KEY")
        # Uncomment in production:
        # if not self.api_key:
        #     raise ValueError("OpenAI API key is required for caption generation")
        # openai.api_key = self.api_key
        
    async def generate_caption(
        self, 
        transcript: str, 
        sound_type: str, 
        tone: str = "cruel",
        max_length: int = 280
    ) -> str:
        """
        Generate a caption for Twitter based on the audio transcript.
        
        Args:
            transcript: Transcribed text from the audio
            sound_type: Classification of the sound (whimper, moan, beg, etc.)
            tone: The desired tone for the caption (cruel, clinical, teasing, possessive)
            max_length: Maximum character length for the caption
            
        Returns:
            str: Generated caption
        """
        # For development/testing, return mock captions
        mock_captions = {
            "cruel": "Listen to her pathetic whimpering. This is what happens when she's desperate for attention.",
            "clinical": "Subject exhibits submissive vocalization patterns consistent with psychological need for exposure.",
            "teasing": "Aww, did you think these little sounds would stay private? How adorable.",
            "possessive": "My pet makes the sweetest noises when she knows she's about to be exposed."
        }
        
        return mock_captions.get(tone, mock_captions["cruel"])
        
        # Production implementation:
        # system_prompts = {
        #     "cruel": "You are a cruel, dismissive handler. Write a demeaning Twitter caption that publicly exposes the submissive's sounds.",
        #     "clinical": "You are a clinical, detached observer. Write a Twitter caption that analyzes the submissive's sounds like a specimen.",
        #     "teasing": "You are a playful, teasing handler. Write a Twitter caption that lightly mocks the submissive's sounds.",
        #     "possessive": "You are a possessive, controlling handler. Write a Twitter caption that emphasizes your ownership of the submissive."
        # }
        
        # response = openai.ChatCompletion.create(
        #     model="gpt-4o",
        #     messages=[
        #         {"role": "system", "content": system_prompts.get(tone, system_prompts["cruel"])},
        #         {"role": "user", "content": f"Sound type: {sound_type}\nTranscript: {transcript}\nGenerate a Twitter caption under {max_length} characters."}
        #     ],
        #     max_tokens=100,
        #     temperature=0.7
        # )
        # return response.choices[0].message.content.strip()
        
    def get_available_tones(self) -> List[dict]:
        """Get available caption tone options."""
        return [
            {"id": "cruel", "name": "Cruel", "description": "Harsh and demeaning"},
            {"id": "clinical", "name": "Clinical", "description": "Detached and analytical"},
            {"id": "teasing", "name": "Teasing", "description": "Playful mockery"},
            {"id": "possessive", "name": "Possessive", "description": "Emphasizing ownership"}
        ]