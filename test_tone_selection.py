#!/usr/bin/env python3
"""
Test script to verify the enhanced tone selection functionality.
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'api'))

from services.gpt_caption import CaptionGenerationService
import asyncio

async def test_tone_selection():
    service = CaptionGenerationService()
    
    print("🎯 Testing Enhanced Tone Selection")
    print("=" * 50)
    
    # Test auto selection multiple times to see variety
    print("\n🔀 Auto Tone Selection (10 tests):")
    for i in range(10):
        caption = await service.generate_caption(
            transcript="I need attention please...",
            sound_type="whimper",
            tone="auto"
        )
        print(f"  {i+1}. {caption[:60]}...")
    
    # Test mixed tone
    print("\n🎭 Mixed Tone Examples:")
    for i in range(3):
        caption = await service.generate_caption(
            transcript="I'm being so good...",
            sound_type="whimper", 
            tone="mixed"
        )
        print(f"  {i+1}. {caption}")
    
    # Test individual tones
    print("\n🎪 Individual Tone Examples:")
    tones = ["cruel", "teasing", "possessive"]
    for tone in tones:
        caption = await service.generate_caption(
            transcript="Please notice me...",
            sound_type="whimper",
            tone=tone
        )
        print(f"  {tone}: {caption}")
    
    # Show available tones
    print("\n📋 Available Tones:")
    for tone_info in service.get_available_tones():
        print(f"  • {tone_info['name']}: {tone_info['description']}")
    
    print(f"\n✅ Preferred tones: {service.preferred_tones}")

if __name__ == "__main__":
    asyncio.run(test_tone_selection())
