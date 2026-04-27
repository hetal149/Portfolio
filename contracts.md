# API Contracts — Hetal Patil Portfolio

## Mocked in frontend (stays static — no backend needed)
All static content lives in `/app/frontend/src/mock.js`:
- `personalInfo`, `stats`, `skills`, `experience`, `projects`, `education`, `certifications`, `languages`, `navLinks`

No API endpoints required for these — they render directly from the imported JS module.

## Backend-only feature: Contact form

### Endpoint
`POST /api/contact`

### Request body
```json
{
  "name": "string (required, 2-80 chars)",
  "email": "string (required, valid email)",
  "subject": "string (optional, max 200 chars)",
  "message": "string (required, 10-5000 chars)"
}
```

### Response
- `200 OK`
```json
{ "success": true, "id": "<mongo-doc-id>", "message": "Sent" }
```
- `422` — validation error (FastAPI default)
- `500` — internal/email failure (still saves to DB)

### Behavior
1. Validate payload with Pydantic.
2. Persist the submission to MongoDB collection `contact_messages` with fields:
   - `id` (uuid), `name`, `email`, `subject`, `message`, `created_at`, `email_sent` (bool), `email_error` (nullable).
3. Send email via **Resend** API to `CONTACT_TO_EMAIL` (hetalpatil149@gmail.com):
   - From: `CONTACT_FROM_EMAIL` (onboarding@resend.dev — Resend's default verified sender)
   - Reply-To: visitor's email (so Hetal can reply directly)
   - Subject: `Portfolio: <subject or "New message from <name>">`
   - HTML body with nice formatting.
4. Even if email fails, DB insert succeeds and API returns 200 — we just mark `email_sent=false` and include error. Frontend shows success either way.

### Env vars (already set)
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Frontend integration

Replace the `localStorage` stub in `/app/frontend/src/components/Contact.jsx`:
- Use `axios.post(${REACT_APP_BACKEND_URL}/api/contact, form)` instead of localStorage.
- Show the same toast on success / error.
- Keep form clearing on success.

No other component changes.
