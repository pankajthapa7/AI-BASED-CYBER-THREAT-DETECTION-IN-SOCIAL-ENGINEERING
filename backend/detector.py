# backend/detector.py (CORRECTED CODE)

class ThreatDetector:
    def __init__(self):
        # Simple suspicious keywords (for demo)
        self.threat_keywords = ["password", "bank", "otp", "login", "credit card", "ssn","click", "link", "verify", "urgent", "account", 
            "locked", "suspended", "reward", "prize", "claim", 
            "gift", "rs", "price"]

    def predict(self, text: str):
        text_lower = text.lower()
        score = sum(word in text_lower for word in self.threat_keywords) / len(self.threat_keywords)
        
        confidence = round(score, 2)

        if score > 0.2:
            label = "phishing"
        else:
            label = "safe"
            
        # CRITICAL FIX: Return a tuple (label, confidence)
        return label, confidence