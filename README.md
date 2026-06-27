# AgroSense AI

**The Climate-to-Farm Decision Engine for the Greater Horn of Africa**

AgroSense AI is an AI-powered agricultural advisory platform that bridges the gap between climate early warnings and actionable farming decisions. Built as a plugin for the [HUSIKA MIMS platform](https://husika.icpac.net), it delivers personalized, crop-specific farm advice to smallholder farmers via WhatsApp, USSD, and SMS.

## Overview

When farmers receive HUSIKA's drought or flood alerts, they know danger is coming — but not what to do about it. AgroSense AI completes the last mile of the early warning chain by:

1. Listening to HUSIKA webhook alerts
2. Matching affected farmers by geographic location
3. Generating personalized advice via RAG + LLM
4. Translating into local languages (Swahili, Somali, Amharic, Oromo, and more)
5. Delivering via WhatsApp, USSD, or SMS

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python 3.11+, FastAPI 0.110+ |
| Task Queue | Celery 5.3+ with Redis |
| Database | PostgreSQL 15+ (with pgvector) |
| AI | OpenAI GPT-4o, Gemini 1.5 Pro fallback |
| Translation | DeepL API, Google Cloud Translation (fallback) |
| Delivery | Africa's Talking API |
| Frontend | Next.js 14 (App Router), TypeScript |

## Project Structure

```
backend/     # FastAPI + Python
frontend/    # Next.js 14
scripts/     # Seed scripts
docs/        # Crop knowledge base
```

## Quick Start

> **Note:** This project is under active development. Refer to the [system specification](./agrosense_ai_system_spec.md) for full build instructions.

```bash
# Clone and setup
git clone git@github.com:consray1/AgrosenseAI.git
cd AgrosenseAI

# Backend setup (requires Python 3.11+)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup (requires Node.js 18+)
cd ../frontend
npm install
```

## Documentation

- [System Specification](./agrosense_ai_system_spec.md) — Full architecture, DB schema, API contracts, AI pipeline, and build instructions

## License

MIT License