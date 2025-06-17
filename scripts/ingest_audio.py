#!/usr/bin/env python3
"""
Audio Ingestion Script for Twitter Handler

This script allows for batch ingestion of audio files into the Twitter Handler API.
It's useful for testing and initial data loading.
"""

import argparse
import os
import requests
import sys
from pathlib import Path
from typing import List, Optional

def ingest_file(
    filepath: str, 
    api_url: str = "http://localhost:8000/submit/audio",
    hint: Optional[str] = None,
    tone: str = "cruel"
) -> dict:
    """
    Upload a single audio file to the API.
    
    Args:
        filepath: Path to audio file
        api_url: URL for the submission API endpoint
        hint: Optional caption hint
        tone: Caption tone (cruel, clinical, teasing, possessive)
        
    Returns:
        dict: API response
    """
    try:
        with open(filepath, "rb") as f:
            files = {"file": (os.path.basename(filepath), f)}
            data = {"tone": tone}
            
            if hint:
                data["caption_hint"] = hint
                
            response = requests.post(api_url, files=files, data=data)
            response.raise_for_status()
            return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error uploading {filepath}: {str(e)}")
        return {"error": str(e)}
    except Exception as e:
        print(f"Unexpected error processing {filepath}: {str(e)}")
        return {"error": str(e)}

def batch_ingest(
    directory: str, 
    api_url: str = "http://localhost:8000/submit/audio",
    extensions: List[str] = [".wav", ".mp3", ".ogg", ".m4a"],
    tone: str = "cruel"
) -> List[dict]:
    """
    Upload all audio files from a directory.
    
    Args:
        directory: Directory containing audio files
        api_url: URL for the submission API endpoint
        extensions: List of valid file extensions to process
        tone: Caption tone to use for all files
        
    Returns:
        list: Results for each file
    """
    results = []
    
    path = Path(directory)
    if not path.exists() or not path.is_dir():
        print(f"Error: Directory {directory} not found")
        return []
    
    for file in path.iterdir():
        if file.is_file() and file.suffix.lower() in extensions:
            print(f"Processing {file}...")
            result = ingest_file(str(file), api_url, tone=tone)
            results.append({"file": file.name, "result": result})
    
    return results

def main():
    parser = argparse.ArgumentParser(description='Ingest audio files into Twitter Handler')
    parser.add_argument('--file', '-f', help='Single audio file to upload')
    parser.add_argument('--directory', '-d', help='Directory of audio files to upload')
    parser.add_argument('--url', '-u', default='http://localhost:8000/submit/audio', 
                        help='API URL (default: http://localhost:8000/submit/audio)')
    parser.add_argument('--hint', help='Caption hint for single file upload')
    parser.add_argument('--tone', default='cruel', choices=['cruel', 'clinical', 'teasing', 'possessive'],
                        help='Caption tone (default: cruel)')

    args = parser.parse_args()
    
    if args.file:
        result = ingest_file(args.file, args.url, args.hint, args.tone)
        print("Upload result:")
        print(result)
    elif args.directory:
        results = batch_ingest(args.directory, args.url, tone=args.tone)
        print(f"Processed {len(results)} files")
        for result in results:
            print(f"{result['file']}: {'Success' if 'error' not in result['result'] else 'Failed'}")
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()