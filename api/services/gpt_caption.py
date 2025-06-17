import os
import random
from typing import Optional, List, Union

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
        # Default preferred tones (excluding clinical)
        self.preferred_tones = ["cruel", "teasing", "possessive"]
        # Uncomment in production:        # if not self.api_key:
        #     raise ValueError("OpenAI API key is required for caption generation")
        # openai.api_key = self.api_key
        
    def _select_tone(self, tone: Union[str, List[str]]) -> str:
        """
        Select a tone based on the input parameter.
        
        Args:
            tone: Can be "auto", "mixed", a single tone, or list of tones
            
        Returns:
            str: Selected tone
        """
        if tone == "auto":
            # Randomly select from preferred tones, with occasional mixed option
            if random.random() < 0.3:  # 30% chance of mixed tone
                return "mixed"
            return random.choice(self.preferred_tones)
        elif tone == "mixed":
            return "mixed"
        elif isinstance(tone, list):
            # Randomly select from provided list, with chance for mixed
            if len(tone) > 1 and random.random() < 0.25:  # 25% chance of mixed if multiple tones provided
                return "mixed"
            return random.choice(tone)
        elif isinstance(tone, str) and tone in ["cruel", "clinical", "teasing", "possessive"]:
            return tone
        else:
            # Default to random selection from preferred with mixed option
            if random.random() < 0.3:
                return "mixed"
            return random.choice(self.preferred_tones)
        
    async def generate_caption(
        self, 
        transcript: str, 
        sound_type: str, 
        tone: Union[str, List[str]] = "auto",
        max_length: int = 280
    ) -> str:
        """
        Generate a caption for Twitter based on the audio transcript.
        
        Args:
            transcript: Transcribed text from the audio
            sound_type: Classification of the sound (whimper, moan, beg, etc.)
            tone: The desired tone(s) for the caption. Can be:
                - "auto": Randomly select from preferred tones
                - Single tone string: "cruel", "clinical", "teasing", "possessive"
                - List of tones: ["cruel", "teasing"] to randomly select from
                - "mixed": Combine multiple tones in one caption
            max_length: Maximum character length for the caption
            
        Returns:
            str: Generated caption
        """
        # Handle different tone selection methods
        selected_tone = self._select_tone(tone)
          # For development/testing, return mock captions
        mock_captions = {
            "cruel": [
                "Listen to her pathetic whimpering. This is what happens when she's desperate for attention.",
                "Such a needy little thing, begging for the whole world to hear her desperation.",
                "The sounds of a broken pet who knows her place. Humiliating, isn't it?",
                "This is what happens when you give a whimpering pet exactly what she deserves - exposure."
            ],
            "clinical": [
                "Subject exhibits submissive vocalization patterns consistent with psychological need for exposure.",
                "Audio analysis indicates heightened emotional state. Recommend continued observation.",
                "Behavioral patterns suggest deep-seated need for public validation through exposure.",
                "Vocalization frequency and pitch indicate optimal submission parameters achieved."
            ],
            "teasing": [
                "Aww, did you think these little sounds would stay private? How adorable.",
                "Someone's being extra whimpery today. Wonder what everyone will think? 😏",
                "Such sweet little noises. Too bad they're about to be everyone's entertainment.",
                "Listen to those precious sounds. I bet she thought no one else would hear them."
            ],
            "possessive": [
                "My pet makes the sweetest noises when she knows she's about to be exposed.",
                "This is what my property sounds like when she's properly trained and displayed.",
                "The sounds of ownership. She belongs to me, and everyone will know it.",
                "My little maple makes such beautiful sounds when she knows she's being claimed."
            ],
            "mixed": [
                "My pathetic little pet whimpers so sweetly when she knows everyone will hear her desperation. How deliciously exposed she'll be.",
                "Listen to my property begging so prettily. Such a clinical case of submission, and yet so cruelly entertaining.",
                "The analytical mind observes: subject craves degradation. The possessive heart responds: she's mine to display.",
                "Aww, my desperate little thing thinks her sounds are private. How wrong she is, and how perfectly that suits my cruel intentions.",
                "Clinical assessment: complete ownership achieved. Personal satisfaction: watching her tease herself into public humiliation.",
                "This is what possession sounds like - sweet desperation mixed with the knowledge that her Handler controls every whimper."
            ]
        }
        
        # Select a random caption from the chosen tone's list
        captions = mock_captions.get(selected_tone, mock_captions["cruel"])
        return random.choice(captions)
        
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
        #     temperature=0.7        # )
        # return response.choices[0].message.content.strip()
        
    def get_available_tones(self) -> List[dict]:
        """Get available caption tone options."""
        return [
            {"id": "auto", "name": "Auto", "description": "Switches between cruel, teasing, and possessive (30% chance mixed)"},
            {"id": "mixed", "name": "Mixed", "description": "Combine multiple tones in one caption"},
            {"id": "cruel", "name": "Cruel", "description": "Harsh and demeaning"},
            {"id": "clinical", "name": "Clinical", "description": "Detached and analytical"},
            {"id": "teasing", "name": "Teasing", "description": "Playful mockery"},
            {"id": "possessive", "name": "Possessive", "description": "Emphasizing ownership"}
        ]
    
    def set_preferred_tones(self, tones: List[str]):
        """Set which tones to use for auto selection."""
        valid_tones = ["cruel", "clinical", "teasing", "possessive"]
        self.preferred_tones = [tone for tone in tones if tone in valid_tones]
        if not self.preferred_tones:
            self.preferred_tones = ["cruel", "teasing", "possessive"]  # fallback