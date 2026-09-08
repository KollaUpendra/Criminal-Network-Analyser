"""
Sarvam Translation API Client
Translates Indian language text to English.
Docs: https://docs.sarvam.ai
"""
import os
import httpx
from loguru import logger


SARVAM_API_URL = os.getenv("SARVAM_API_URL", "https://api.sarvam.ai")
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY", "")

SUPPORTED_SOURCE_LANGUAGES = [
    "hi-IN", "te-IN", "ta-IN", "kn-IN",
    "ml-IN", "bn-IN", "mr-IN", "gu-IN", "pa-IN",
]


class SarvamTranslationClient:
    """
    Wraps the Sarvam Translate API.
    Phase 1: translate() used after language detection.
    """

    def __init__(self, api_key: str = SARVAM_API_KEY):
        if not api_key:
            logger.warning("[Sarvam] No API key set. Set SARVAM_API_KEY in .env")
        self.api_key = api_key
        self.base_url = SARVAM_API_URL

    def translate(self, text: str, source_lang: str, target_lang: str = "en-IN") -> str:
        """
        Translate text from source_lang to target_lang (default English).
        Returns translated string.
        TODO: handle chunking for texts > API limit.
        """
        headers = {
            "api-subscription-key": self.api_key,
            "Content-Type": "application/json",
        }
        payload = {
            "input": text,
            "source_language_code": source_lang,
            "target_language_code": target_lang,
            "speaker_gender": "Male",
            "mode": "formal",
            "model": "mayura:v1",
            "enable_preprocessing": True,
        }
        try:
            with httpx.Client(timeout=30) as client:
                response = client.post(
                    f"{self.base_url}/translate",
                    headers=headers,
                    json=payload,
                )
                response.raise_for_status()
                return response.json().get("translated_text", text)
        except httpx.HTTPError as e:
            logger.error(f"[Sarvam] Translation failed: {e}")
            return text  # Fallback: return original text
