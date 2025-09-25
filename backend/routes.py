from fastapi import APIRouter
from pydantic import BaseModel
from .detector import ThreatDetector

router = APIRouter()

# Request model
class ThreatRequest(BaseModel):
    text: str

# Initialize detector
detector = ThreatDetector()

@router.post("/predict")
def predict_threat(data: ThreatRequest):
    prediction, confidence = detector.predict(data.text)
    return {
        "text": data.text,
        "prediction": prediction,
        "confidence": confidence
    }
