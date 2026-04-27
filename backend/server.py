from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import uuid
from datetime import datetime
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
CONTACT_TO_EMAIL = os.environ.get('CONTACT_TO_EMAIL', 'hetalpatil149@gmail.com')
CONTACT_FROM_EMAIL = os.environ.get('CONTACT_FROM_EMAIL', 'onboarding@resend.dev')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# App
app = FastAPI(title="Hetal Patil Portfolio API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    success: bool
    id: str
    message: str
    email_sent: bool = False


# ---------- Helpers ----------
def build_email_html(payload: ContactCreate) -> str:
    safe_subject = payload.subject or f"New message from {payload.name}"
    bullet = "\u2022"
    timestamp = datetime.utcnow().strftime(f'%b %d, %Y {bullet} %H:%M UTC')
    return f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, Arial, sans-serif; background:#0a0a0b; padding:24px; color:#e5e7eb;">
  <div style="max-width:600px; margin:auto; background:#111113; border:1px solid #1f2937; border-radius:12px; padding:28px;">
    <div style="border-left:3px solid #10b981; padding-left:12px; margin-bottom:20px;">
      <div style="font-size:12px; color:#10b981; text-transform:uppercase; letter-spacing:1px; font-family:monospace;">New Portfolio Contact</div>
      <h2 style="margin:6px 0 0; color:#fff;">{safe_subject}</h2>
    </div>
    <table style="width:100%; font-size:14px; color:#d4d4d8; border-collapse:collapse;">
      <tr><td style="padding:6px 0; color:#71717a; width:80px;">From:</td><td><strong style="color:#fff;">{payload.name}</strong></td></tr>
      <tr><td style="padding:6px 0; color:#71717a;">Email:</td><td><a href="mailto:{payload.email}" style="color:#34d399; text-decoration:none;">{payload.email}</a></td></tr>
      <tr><td style="padding:6px 0; color:#71717a; vertical-align:top;">Message:</td>
          <td style="white-space:pre-wrap; line-height:1.6;">{payload.message}</td></tr>
    </table>
    <div style="margin-top:24px; padding-top:16px; border-top:1px solid #1f2937; font-size:12px; color:#71717a;">
      Sent via your portfolio contact form {bullet} {timestamp}
    </div>
  </div>
</body>
</html>
"""


async def send_contact_email(payload: ContactCreate) -> tuple[bool, Optional[str]]:
    if not RESEND_API_KEY:
        return False, "RESEND_API_KEY not configured"
    try:
        safe_subject = payload.subject or f"New message from {payload.name}"
        params = {
            "from": f"Portfolio Contact <{CONTACT_FROM_EMAIL}>",
            "to": [CONTACT_TO_EMAIL],
            "reply_to": payload.email,
            "subject": f"[Portfolio] {safe_subject}",
            "html": build_email_html(payload),
        }
        resp = resend.Emails.send(params)
        logger.info(f"Resend response: {resp}")
        return True, None
    except Exception as e:
        logger.exception("Failed to send contact email via Resend")
        return False, str(e)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hetal Patil Portfolio API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "resend_configured": bool(RESEND_API_KEY),
        "to_email": CONTACT_TO_EMAIL,
    }


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactCreate):
    doc_id = str(uuid.uuid4())
    email_sent, email_error = await send_contact_email(payload)

    doc = {
        "id": doc_id,
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "created_at": datetime.utcnow(),
        "email_sent": email_sent,
        "email_error": email_error,
    }
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to persist contact message")
        raise HTTPException(status_code=500, detail="Failed to save message")

    return ContactResponse(
        success=True,
        id=doc_id,
        message="Message received. I'll get back to you soon!",
        email_sent=email_sent,
    )


@api_router.get("/contact/messages")
async def list_contact_messages(limit: int = 50):
    """Admin-ish endpoint to see recent submissions (simple, no auth for MVP)."""
    cursor = db.contact_messages.find().sort("created_at", -1).limit(limit)
    items = []
    async for doc in cursor:
        doc.pop("_id", None)
        if isinstance(doc.get("created_at"), datetime):
            doc["created_at"] = doc["created_at"].isoformat()
        items.append(doc)
    return {"count": len(items), "items": items}


# Include router and CORS
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
