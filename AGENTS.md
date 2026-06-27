# AgroSense AI — Agent Instructions

> This repository contains a **planned project** (no code yet). The primary source of truth is `agrosense_ai_system_spec.md`. Read it before building anything.

## Build Order (from spec Section 18)

1. Read the full spec first
2. Start with the **database schema** (Section 7) — run migrations before building any API
3. Build and test each layer independently before integrating
4. Use the exact technology versions in Section 5

## Critical Don'ts

- DO NOT use synchronous database calls — use async SQLAlchemy with `asyncpg`
- DO NOT store raw phone numbers in logs
- DO NOT commit `.env` files to Git
- DO NOT skip HMAC validation on the HUSIKA webhook
- DO NOT call LLM with temperature > 0.5 for advice (too creative = dangerous for farming decisions)
- DO NOT use deprecated LangChain v0.1 syntax — use v0.2+

## Critical Do's

- Use connection pooling for PostgreSQL (`asyncpg` pool)
- Implement exponential backoff on all external API calls
- Pre-warm the RAG index before demos (cold start = slow first query)
- Cache top 10 most common (hazard, crop) combinations in Redis
- Have a fallback LLM (Gemini) if OpenAI rate limits
- Test the demo trigger endpoint before any live demo

## Translation Caveat

DeepL does **not** support: Swahili, Somali, Amharic, Oromo.
Use **Google Cloud Translation** for these languages (see Appendix C in spec).

## HUSIKA Integration

- HUSIKA webhook payload format may differ from spec — **validate with ICPAC/Bunifu team at hackathon**
- Geographic unit matching: "Wajir County" and "Wajir" should both resolve
- If no webhook available, poll the alert feed every 5 minutes via Celery beat

## Project Structure (planned)

```
backend/     # FastAPI + Python 3.11+
frontend/    # Next.js 14 (App Router)
scripts/     # Seed scripts
docs/        # Crop knowledge PDFs (to be downloaded from CIMMYT, FAO, CGIAR, etc.)
```

## Pre-Demo Checklist

- [ ] Seed demo data (500 farmers: 60% Kenya, 25% Ethiopia, 15% Uganda)
- [ ] Pre-warm RAG index
- [ ] Test WhatsApp delivery with a real number 2 hours before demo
- [ ] Monitor Celery worker status during demo

## Key Files

| File | Purpose |
|------|---------|
| `agrosense_ai_system_spec.md` | Full spec — architecture, DB schema, API contracts, AI pipeline, prompts, build instructions |
| Section 18 | Detailed AI agent build instructions and code patterns |
| Appendix A | HUSIKA integration notes |
| Appendix B | Africa's Talking setup |
| Appendix C | Language codes and translation matrix |