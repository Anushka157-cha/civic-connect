from fastapi import FastAPI
from pydantic import BaseModel
from twilio.rest import Client
import uuid, os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Jan Sewa Samadhan Backend")

# Twilio Setup
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE = os.getenv("TWILIO_PHONE")

# Initialize Twilio client
client = Client(TWILIO_SID, TWILIO_AUTH)

# Model for Complaint Data
class Complaint(BaseModel):
    name: str
    phone: str
    text: str

# Temporary storage (you’ll connect database later)
complaints = []

@app.post("/register")
def register_complaint(data: Complaint):
    """Register a new complaint and send SMS confirmation"""
    cid = "CMP" + str(uuid.uuid4())[:6]
    category = classify_text(data.text)

    complaint = {
        "id": cid,
        "name": data.name,
        "phone": data.phone,
        "text": data.text,
        "category": category,
        "status": "Active"
    }

    complaints.append(complaint)

    # Send confirmation SMS to user
    send_sms(data.phone, f"Your complaint {cid} has been registered under {category}. Thank you!")

    return {"message": "Complaint registered successfully", "complaint_id": cid, "category": category}

@app.get("/complaints")
def get_all_complaints():
    """Fetch all registered complaints"""
    return complaints

def classify_text(text):
    """Simple rule-based category classifier"""
    text = text.lower()
    if "pani" in text or "water" in text:
        return "Water Department"
    elif "road" in text or "sadak" in text:
        return "Public Works"
    elif "bijli" in text or "light" in text:
        return "Electricity"
    else:
        return "General"

def send_sms(to, message):
    """Send SMS using Twilio"""
    try:
        client.messages.create(
            body=message,
            from_=TWILIO_PHONE,
            to=f"+91{to}"  # add +91 for Indian numbers
        )
        print(f"✅ SMS sent to {to}")
    except Exception as e:
        print(f"❌ SMS failed: {e}")
