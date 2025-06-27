import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class AIModelManager:
    """Lightweight mock AI manager to reduce startup memory."""

    def __init__(self, *_, **__):
        pass

    async def generate_text(self, prompt: str, max_length: int = 100) -> str:
        return prompt[:max_length] + "..."

    async def analyze_sentiment(self, text: str) -> Dict[str, Any]:
        return {"label": "POSITIVE", "confidence": 0.99}

    async def answer_question(self, question: str, context: str) -> Dict[str, Any]:
        return {"answer": context.split()[0], "confidence": 0.5}

    async def summarize_text(self, text: str, max_length: int = 150) -> Dict[str, Any]:
        return {"summary": text[:max_length], "method": "abstractive"}

    async def extract_entities(self, text: str) -> List[Dict[str, Any]]:
        return []

    async def predict(self, data: List[List[float]]) -> List[float]:
        return [sum(row) for row in data]

    async def generate_description(self, title: str) -> str:
        return f"Amazing product: {title}"
