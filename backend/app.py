# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from detector import ThreatDetector

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)
detector = ThreatDetector()

class Message(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "✅ Backend is running successfully!"}

@app.post("/predict")
def analyze(message: Message):
    result = detector.predict(message.text)
    return  {"text": message.text, "prediction": result[0], "confidence": result[1]}
