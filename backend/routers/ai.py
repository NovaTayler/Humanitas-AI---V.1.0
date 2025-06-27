from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from backend.services.ai_manager import AIModelManager
from backend.core.config import config

router = APIRouter(prefix="/api/ai")

ai_manager = AIModelManager(config.MODEL_PATH, config.TORCH_DEVICE)

class AIRequest(BaseModel):
    prompt: str
    max_length: int = 100

class SentimentRequest(BaseModel):
    text: str

class QuestionRequest(BaseModel):
    question: str
    context: str

class SummarizeRequest(BaseModel):
    text: str
    max_length: int = 150

class NERRequest(BaseModel):
    text: str

class PredictRequest(BaseModel):
    data: List[List[float]]

@router.post("/generate")
async def generate_text(req: AIRequest):
    return {"result": await ai_manager.generate_text(req.prompt, req.max_length)}

@router.post("/sentiment")
async def analyze_sentiment(req: SentimentRequest):
    return await ai_manager.analyze_sentiment(req.text)

@router.post("/question")
async def answer_question(req: QuestionRequest):
    return await ai_manager.answer_question(req.question, req.context)

@router.post("/summarize")
async def summarize_text(req: SummarizeRequest):
    return await ai_manager.summarize_text(req.text, req.max_length)

@router.post("/ner")
async def extract_entities(req: NERRequest):
    return await ai_manager.extract_entities(req.text)

@router.post("/predict")
async def predict(req: PredictRequest):
    return {"predictions": await ai_manager.predict(req.data)}
