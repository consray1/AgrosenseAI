# AgroSense AI — Full System Specification & AI Build Instructions

> **Purpose:** This document is a complete, self-contained specification that any AI coding assistant, LLM agent, or developer can use to build AgroSense AI from scratch during a hackathon. It contains the product definition, architecture, data models, API contracts, AI pipeline design, prompt templates, security rules, and step-by-step build instructions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Solution Design](#3-solution-design)
4. [System Architecture](#4-system-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Environment & Configuration](#6-environment--configuration)
7. [Database Schema](#7-database-schema)
8. [AI Pipeline Specification](#8-ai-pipeline-specification)
9. [Prompt Templates](#9-prompt-templates)
10. [API Specification](#10-api-specification)
11. [Delivery Channel Handlers](#11-delivery-channel-handlers)
12. [Frontend Specification](#12-frontend-specification)
13. [Security Requirements](#13-security-requirements)
14. [Docker & Infrastructure](#14-docker--infrastructure)
15. [Build Order & Sprint Plan](#15-build-order--sprint-plan)
16. [Demo Data & Seeding](#16-demo-data--seeding)
17. [Testing Checklist](#17-testing-checklist)
18. [AI Agent Instructions](#18-ai-agent-instructions)

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Project Name** | AgroSense AI |
| **Tagline** | The Climate-to-Farm Decision Engine |
| **Parent Platform** | HUSIKA MIMS (husika.icpac.net / app.husika.io) |
| **Built By** | ICPAC — IGAD Climate Prediction and Applications Centre |
| **Target Region** | Greater Horn of Africa (Kenya, Ethiopia, Uganda, Sudan, Djibouti, Somalia) |
| **Primary Users** | Smallholder farmers and pastoralists (18M+) |
| **Secondary Users** | Agricultural extension workers, NGO field officers, National DRM entities |
| **Hackathon Category** | Climate-Tech / AgriTech / AI / Humanitarian Innovation |

---

## 2. Problem Statement

### Context

HUSIKA is the official early warning dissemination platform for the IGAD region. It broadcasts climate alerts (drought, flood, cyclone, locust) to millions of end users via SMS, mobile app, and web.

### The Gap

When a farmer in Marsabit, Kenya receives this SMS at 6am:

```
DROUGHT RISK: HIGH — MARSABIT COUNTY — NEXT 14 DAYS
Source: ICPAC / HUSIKA
```

They do not know:
- Whether to harvest their maize early or wait
- Whether to apply for drought relief
- Whether to switch to a drought-tolerant crop variety
- How to adjust their irrigation schedule
- What pest or disease risk accompanies the drought

**HUSIKA tells them danger is coming. Nothing tells them what to do.**

### Scale of Impact

- 18 million smallholder farmers at risk in the IGAD region
- Average farm size: 0.5–2 hectares
- Primary crops: maize, sorghum, millet, beans, cassava, teff
- Most farmers have a feature phone or low-end Android
- Most farmers speak Swahili, Somali, Amharic, Oromo, or Arabic — not English

### The Opportunity

AgroSense AI completes the last mile of the early warning chain:

```
ICPAC Climate Model → HUSIKA Alert → [AgroSense AI] → Actionable Farm Advice → Farmer
```

---

## 3. Solution Design

### Core Concept

AgroSense AI is a plugin/extension that:

1. **Listens** to the HUSIKA alert webhook feed
2. **Matches** each alert to registered farmers in the affected geographic area
3. **Enriches** each alert with the farmer's profile (crop type, growth stage, soil type, location)
4. **Retrieves** relevant agronomic guidance from a RAG knowledge base (CIMMYT, FAO, CGIAR documents)
5. **Generates** personalized, crop-specific, actionable advice using an LLM
6. **Translates** the advice into the farmer's preferred language
7. **Delivers** the advice via WhatsApp, USSD, or SMS using Africa's Talking API
8. **Collects** farmer feedback and pipes it back to HUSIKA's survey module

### What It Is NOT

- Not a weather dashboard (HUSIKA already has this)
- Not a replacement for HUSIKA (it is a plugin that depends on HUSIKA)
- Not a generic chatbot (it is a precision, event-triggered advisory system)

### Key Differentiators

| Feature | HUSIKA (existing) | AgroSense AI (new) |
|---------|-------------------|---------------------|
| Alert delivery | ✅ | ✅ (inherits) |
| Crop-specific advice | ❌ | ✅ |
| Growth-stage awareness | ❌ | ✅ |
| Local language support | Partial | ✅ (6 languages) |
| WhatsApp delivery | ❌ | ✅ |
| USSD for feature phones | ❌ | ✅ |
| Farmer feedback loop | Basic | ✅ Structured |
| AI-powered reasoning | ❌ | ✅ RAG + LLM |

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        HUSIKA PLATFORM                          │
│  (husika.icpac.net / ICPAC Alert System)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Webhook: POST /api/v1/webhooks/husika-alert
                           │ (HMAC-SHA256 signed)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AGROSENSE AI BACKEND                         │
│                    FastAPI + Python 3.11                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │  Webhook    │  │  Farmer     │  │  Analytics &        │   │
│  │  Receiver   │  │  Registry   │  │  Dashboard API      │   │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘   │
│         │                                                       │
│         ▼ Celery Task Queue (Redis)                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  AI ADVICE PIPELINE                      │   │
│  │                                                          │   │
│  │  1. Match farmers (PostgreSQL geo query)                 │   │
│  │  2. Retrieve crop knowledge (pgvector RAG)               │   │
│  │  3. Generate advice (OpenAI GPT-4o / Gemini 1.5 Pro)    │   │
│  │  4. Translate advice (DeepL API)                         │   │
│  │  5. Queue delivery tasks                                  │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│                             │                                    │
└─────────────────────────────┼────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
    ┌──────────────┐  ┌─────────────┐  ┌─────────────┐
    │  WhatsApp    │  │    USSD     │  │     SMS     │
    │  (Africa's  │  │  (Africa's  │  │  (Fallback) │
    │   Talking)  │  │   Talking)  │  │             │
    └──────┬───────┘  └──────┬──────┘  └──────┬──────┘
           │                 │                 │
           └─────────────────┼─────────────────┘
                             ▼
                    ┌─────────────────┐
                    │    FARMER       │
                    │ (Smallholder /  │
                    │  Pastoralist)   │
                    └─────────────────┘
                             │
                    Feedback Reply
                             │
                             ▼
                    ┌─────────────────┐
                    │  HUSIKA Survey  │
                    │    Module       │
                    └─────────────────┘

External Data Stores:
┌──────────────────────────────────────────────────────────┐
│  PostgreSQL (+ pgvector)  │  Redis  │  Farmer Profiles   │
│  Alert logs               │  Queue  │  Advice History    │
│  Crop knowledge embeddings│  Cache  │  Feedback Records  │
└──────────────────────────────────────────────────────────┘

Frontend:
┌──────────────────────────────────────────────────────────┐
│  Next.js 14 Admin Dashboard (Vercel)                     │
│  - Alert feed, farmer map, advice log, analytics         │
└──────────────────────────────────────────────────────────┘
```

---

## 5. Technology Stack

### Backend

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Language | Python | 3.11+ | All backend logic |
| Web Framework | FastAPI | 0.110+ | REST API + webhook receiver |
| ASGI Server | Uvicorn | latest | Production server |
| Task Queue | Celery | 5.3+ | Async advice generation and delivery |
| ORM | SQLAlchemy | 2.0+ | Database access |
| Migrations | Alembic | latest | Schema versioning |
| AI Orchestration | LangChain | 0.2+ | RAG pipeline, LLM chains |
| Validation | Pydantic | 2.0+ | Request/response models |

### AI & ML

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Primary LLM | OpenAI GPT-4o | Advice generation |
| Fallback LLM | Google Gemini 1.5 Pro | Redundancy |
| Embeddings | OpenAI text-embedding-3-small | RAG indexing |
| Vector DB | pgvector (PostgreSQL extension) | RAG storage |
| Translation | DeepL API | Swahili, Somali, Amharic |
| Translation fallback | Google Cloud Translation | Additional languages |

### Databases & Caching

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Primary DB | PostgreSQL 15+ | Farmers, alerts, advice, feedback |
| Vector store | pgvector | Crop knowledge embeddings |
| Cache / Queue | Redis 7+ | Celery broker, rate limiting, sessions |

### Delivery Channels

| Channel | Technology | Use Case |
|---------|-----------|----------|
| WhatsApp | Africa's Talking API | Primary (smartphone users) |
| USSD | Africa's Talking API | Feature phone users (no internet) |
| SMS | Africa's Talking API | Fallback for all users |

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Next.js 14 (App Router) | Admin dashboard |
| Styling | Tailwind CSS | UI styling |
| Charts | Recharts | Analytics visualizations |
| Maps | Leaflet.js + OpenStreetMap | Farmer / alert geo view |
| Deployment | Vercel | Hosting |

### DevOps

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Containerization | Docker + Docker Compose | Local and production |
| CI/CD | GitHub Actions | Automated tests and deploy |
| Hosting (API) | Railway or Render | Hackathon backend hosting |
| Automation | n8n | Alert routing workflow automation |
| Secrets | Environment variables / Docker secrets | API key management |

---

## 6. Environment & Configuration

### Required Environment Variables

Create a `.env` file in the project root. **Never commit this file to Git.**

```env
# ─── Application ───────────────────────────────────────────────
APP_ENV=development                          # development | production
APP_SECRET_KEY=<random-32-char-string>       # JWT signing key
APP_PORT=8000

# ─── Database ──────────────────────────────────────────────────
DATABASE_URL=postgresql+asyncpg://agrosense:password@localhost:5432/agrosense_db
REDIS_URL=redis://localhost:6379/0

# ─── HUSIKA Integration ────────────────────────────────────────
HUSIKA_WEBHOOK_SECRET=<hmac-secret-from-husika-team>
HUSIKA_API_BASE_URL=https://husika.icpac.net/api
HUSIKA_API_KEY=<husika-api-key>

# ─── OpenAI ────────────────────────────────────────────────────
OPENAI_API_KEY=<openai-api-key>
OPENAI_MODEL=gpt-4o
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
OPENAI_MAX_TOKENS=400
OPENAI_TEMPERATURE=0.2

# ─── Google Gemini (fallback LLM) ──────────────────────────────
GOOGLE_API_KEY=<google-api-key>
GEMINI_MODEL=gemini-1.5-pro

# ─── Africa's Talking ──────────────────────────────────────────
AT_API_KEY=<africas-talking-api-key>
AT_USERNAME=<africas-talking-username>
AT_SENDER_ID=AgroSense                      # Shortcode or alphanumeric sender
AT_WHATSAPP_NUMBER=<wa-business-number>

# ─── DeepL Translation ─────────────────────────────────────────
DEEPL_API_KEY=<deepl-api-key>

# ─── Google Cloud Translation (fallback) ───────────────────────
GOOGLE_TRANSLATE_API_KEY=<google-translate-key>

# ─── Rate Limiting ─────────────────────────────────────────────
RATE_LIMIT_PER_MINUTE_PUBLIC=100
RATE_LIMIT_PER_MINUTE_AUTHENTICATED=1000
MAX_CONCURRENT_LLM_CALLS=50

# ─── Frontend ──────────────────────────────────────────────────
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Configuration Class (`app/core/config.py`)

```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_env: str = "development"
    app_secret_key: str
    app_port: int = 8000

    database_url: str
    redis_url: str

    husika_webhook_secret: str
    husika_api_base_url: str
    husika_api_key: str

    openai_api_key: str
    openai_model: str = "gpt-4o"
    openai_embedding_model: str = "text-embedding-3-small"
    openai_max_tokens: int = 400
    openai_temperature: float = 0.2

    google_api_key: str = ""
    gemini_model: str = "gemini-1.5-pro"

    at_api_key: str
    at_username: str
    at_sender_id: str = "AgroSense"
    at_whatsapp_number: str

    deepl_api_key: str
    google_translate_api_key: str = ""

    rate_limit_per_minute_public: int = 100
    rate_limit_per_minute_authenticated: int = 1000
    max_concurrent_llm_calls: int = 50

    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings() -> Settings:
    return Settings()
```

---

## 7. Database Schema

### Full SQL Schema

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ─── Organizations (NGOs, government entities subscribing to HUSIKA) ───
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('national_entity', 'ngo', 'research', 'commercial')),
    country VARCHAR(100) NOT NULL,
    husika_org_id VARCHAR(100) UNIQUE,           -- HUSIKA platform org reference
    contact_email VARCHAR(200),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Farmers ──────────────────────────────────────────────────────────
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,

    -- Identity
    name VARCHAR(200) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    phone_number_hash VARCHAR(64) NOT NULL,       -- SHA256(phone+salt) for analytics

    -- Location
    country VARCHAR(100) NOT NULL DEFAULT 'Kenya',
    county VARCHAR(100) NOT NULL,
    sub_county VARCHAR(100),
    ward VARCHAR(100),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),

    -- Farm profile
    crop_type VARCHAR(50) NOT NULL CHECK (
        crop_type IN ('maize', 'sorghum', 'millet', 'beans', 'cassava',
                      'teff', 'wheat', 'rice', 'cowpea', 'groundnut',
                      'sesame', 'sunflower', 'potato', 'tomato', 'mixed')
    ),
    crop_variety VARCHAR(100),                    -- e.g. "H614D drought-tolerant maize"
    acreage DECIMAL(6, 2),                        -- hectares
    planting_date DATE,                           -- used to calculate growth stage
    soil_type VARCHAR(50) CHECK (
        soil_type IN ('clay', 'loam', 'sandy', 'silt', 'clay_loam', 'unknown')
    ),
    has_irrigation BOOLEAN DEFAULT false,
    livestock_type VARCHAR(100),                  -- for pastoralists

    -- Preferences
    language_pref VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (
        language_pref IN ('en', 'sw', 'so', 'am', 'or', 'ar', 'fr')
    ),
    channel_pref VARCHAR(20) NOT NULL DEFAULT 'whatsapp' CHECK (
        channel_pref IN ('whatsapp', 'ussd', 'sms')
    ),

    -- Status
    is_active BOOLEAN DEFAULT true,
    consent_given BOOLEAN DEFAULT false,
    consent_date TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_farmers_county ON farmers(county);
CREATE INDEX idx_farmers_sub_county ON farmers(sub_county);
CREATE INDEX idx_farmers_crop_type ON farmers(crop_type);
CREATE INDEX idx_farmers_active ON farmers(is_active);
CREATE INDEX idx_farmers_location ON farmers(latitude, longitude);

-- ─── Alerts (received from HUSIKA) ────────────────────────────────────
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    husika_alert_id VARCHAR(200) UNIQUE,          -- HUSIKA's own alert identifier

    hazard_type VARCHAR(50) NOT NULL CHECK (
        hazard_type IN ('drought', 'flood', 'cyclone', 'locust', 'heatwave',
                        'frost', 'strong_winds', 'heavy_rainfall', 'disease')
    ),
    severity VARCHAR(20) NOT NULL CHECK (
        severity IN ('watch', 'advisory', 'low', 'medium', 'high', 'extreme')
    ),
    status VARCHAR(20) NOT NULL DEFAULT 'received' CHECK (
        status IN ('received', 'processing', 'dispatched', 'completed', 'failed')
    ),

    -- Geographic scope
    affected_countries TEXT[] DEFAULT '{}',
    affected_counties TEXT[] DEFAULT '{}',
    affected_sub_counties TEXT[] DEFAULT '{}',

    -- Forecast window
    forecast_valid_from DATE,
    forecast_valid_to DATE,
    forecast_lead_days INTEGER,

    -- Content
    alert_title TEXT,
    alert_description TEXT,
    recommended_actions TEXT,
    source_model VARCHAR(100),                    -- e.g. "GFS", "ECMWF", "ICPAC-SEASONAL"
    confidence_level VARCHAR(20),

    -- Metadata
    raw_payload JSONB,                            -- full original webhook payload
    farmers_matched INTEGER DEFAULT 0,
    advice_sent INTEGER DEFAULT 0,

    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_alerts_hazard_type ON alerts(hazard_type);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_received_at ON alerts(received_at);

-- ─── Advice Records ────────────────────────────────────────────────────
CREATE TABLE advice_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,

    -- Generated content
    advice_text TEXT NOT NULL,                    -- English (generated)
    advice_text_translated TEXT,                  -- Target language
    target_language VARCHAR(10),

    -- AI metadata
    rag_sources TEXT[],                           -- document IDs used for RAG
    rag_chunks_used INTEGER DEFAULT 0,
    llm_model VARCHAR(100),
    llm_provider VARCHAR(50),                     -- openai | gemini
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_cost_usd DECIMAL(10, 6),

    -- Crop context at time of advice
    crop_type VARCHAR(50),
    growth_stage VARCHAR(100),                    -- calculated from planting_date
    soil_type VARCHAR(50),
    has_irrigation BOOLEAN,

    -- Delivery
    channel VARCHAR(20),
    delivery_status VARCHAR(20) DEFAULT 'pending' CHECK (
        delivery_status IN ('pending', 'queued', 'sent', 'delivered', 'read', 'failed', 'bounced')
    ),
    delivery_error TEXT,
    at_message_id VARCHAR(200),                   -- Africa's Talking message ID
    queued_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_advice_alert_id ON advice_records(alert_id);
CREATE INDEX idx_advice_farmer_id ON advice_records(farmer_id);
CREATE INDEX idx_advice_delivery_status ON advice_records(delivery_status);
CREATE INDEX idx_advice_created_at ON advice_records(created_at);

-- ─── Farmer Feedback ──────────────────────────────────────────────────
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    advice_id UUID NOT NULL REFERENCES advice_records(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,

    -- Ratings (1–5 scale)
    helpfulness_rating INTEGER CHECK (helpfulness_rating BETWEEN 1 AND 5),
    forecast_accuracy_rating INTEGER CHECK (forecast_accuracy_rating BETWEEN 1 AND 5),

    -- Boolean responses
    applied_advice BOOLEAN,
    weather_matched_forecast BOOLEAN,

    -- Free-form
    additional_comment TEXT,
    raw_sms_reply TEXT,                           -- original unprocessed SMS response

    channel VARCHAR(20),
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─── Crop Knowledge (RAG documents) ───────────────────────────────────
CREATE TABLE crop_knowledge (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_name VARCHAR(200) NOT NULL,            -- e.g. "CIMMYT Drought Stress Guide"
    source_url TEXT,
    source_date DATE,

    -- Content classification
    crop_type VARCHAR(50),                        -- null means applies to all crops
    hazard_type VARCHAR(50),                      -- null means all hazards
    growth_stage VARCHAR(50),                     -- null means all stages
    region VARCHAR(100),                          -- e.g. "East Africa", "Sub-Saharan Africa"

    -- Content
    chunk_index INTEGER NOT NULL DEFAULT 0,
    content TEXT NOT NULL,
    content_summary TEXT,                         -- 1-sentence LLM-generated summary

    -- Vector embedding
    embedding vector(1536),                       -- OpenAI text-embedding-3-small

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX ON crop_knowledge USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
CREATE INDEX idx_crop_knowledge_crop ON crop_knowledge(crop_type);
CREATE INDEX idx_crop_knowledge_hazard ON crop_knowledge(hazard_type);

-- ─── Audit Log ────────────────────────────────────────────────────────
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    actor_type VARCHAR(50),                       -- system | user | webhook
    actor_id VARCHAR(200),
    ip_address INET,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created_at ON audit_log(created_at);
```

---

## 8. AI Pipeline Specification

### Pipeline Overview

```
Input: alert_id + farmer_id
         │
         ▼
┌─────────────────────────────────┐
│  Step 1: Load Context           │
│  - Fetch alert from DB          │
│  - Fetch farmer profile from DB │
│  - Calculate growth stage       │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Step 2: RAG Retrieval          │
│  - Build retrieval query        │
│  - Embed query (text-emb-3-sm)  │
│  - pgvector cosine similarity   │
│  - Return top 5 chunks          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Step 3: Advice Generation      │
│  - Build prompt from template   │
│  - Inject alert + farmer + RAG  │
│  - Call GPT-4o (temp=0.2)       │
│  - Validate output format       │
│  - Retry once on failure        │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Step 4: Translation            │
│  - If language != 'en'          │
│  - Call DeepL API               │
│  - Fallback: Google Translate   │
│  - Store both versions          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Step 5: Delivery               │
│  - Select channel (WA/USSD/SMS) │
│  - Format message per channel   │
│  - Call Africa's Talking API    │
│  - Log delivery status          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Step 6: Feedback Scheduling    │
│  - Schedule follow-up SMS       │
│  - Trigger: 24h after delivery  │
│  - 2-question structured reply  │
└─────────────────────────────────┘
```

### Growth Stage Calculation

```python
from datetime import date
from typing import Optional

GROWTH_STAGES = {
    "maize": [
        (0, 7, "germination"),
        (7, 21, "seedling"),
        (21, 45, "vegetative"),
        (45, 65, "tasseling"),
        (65, 85, "silking_and_pollination"),
        (85, 100, "grain_fill"),
        (100, 130, "dough_stage"),
        (130, 999, "maturity_and_harvest"),
    ],
    "sorghum": [
        (0, 10, "germination"),
        (10, 30, "seedling"),
        (30, 60, "vegetative"),
        (60, 75, "booting"),
        (75, 90, "heading"),
        (90, 110, "grain_fill"),
        (110, 999, "maturity"),
    ],
    "beans": [
        (0, 7, "germination"),
        (7, 20, "seedling"),
        (20, 35, "vegetative"),
        (35, 55, "flowering"),
        (55, 75, "pod_fill"),
        (75, 999, "maturity"),
    ],
    # Add other crops as needed
}

def calculate_growth_stage(
    crop_type: str,
    planting_date: Optional[date],
    reference_date: Optional[date] = None
) -> str:
    if not planting_date:
        return "unknown"
    reference_date = reference_date or date.today()
    days_since_planting = (reference_date - planting_date).days
    if days_since_planting < 0:
        return "pre_planting"
    stages = GROWTH_STAGES.get(crop_type, GROWTH_STAGES.get("maize"))
    for start, end, stage in stages:
        if start <= days_since_planting < end:
            return stage
    return "post_harvest"
```

### RAG Query Construction

```python
def build_rag_query(
    hazard_type: str,
    severity: str,
    crop_type: str,
    growth_stage: str,
    has_irrigation: bool
) -> str:
    """
    Build a natural language query for RAG retrieval.
    The query is designed to surface the most relevant agronomic guidance.
    """
    irrigation_context = "with irrigation access" if has_irrigation else "without irrigation, rainfed"
    return (
        f"What should a {crop_type} farmer do during {severity} {hazard_type} risk? "
        f"The crop is at {growth_stage} stage, grown {irrigation_context} in East Africa. "
        f"What are the recommended adaptive management practices, immediate actions, "
        f"and risk mitigation strategies?"
    )
```

### LLM Call Specification

```python
# Model: GPT-4o
# Temperature: 0.2 (low creativity, high factual accuracy)
# Max tokens: 400
# Top-p: 0.9
# Frequency penalty: 0.3 (reduce repetition)
# Presence penalty: 0.0

SYSTEM_PROMPT = """You are AgroSense, an expert agricultural extension officer with 20 years 
of experience advising smallholder farmers in East Africa on climate adaptation.

Your role is to provide specific, actionable, evidence-based farm management advice 
when a climate early warning alert is received.

Rules you must follow:
1. Give EXACTLY 3 numbered recommendations. No more, no fewer.
2. Each recommendation must be a specific action, not general advice.
3. Use simple, direct language a farmer with primary education can understand.
4. Reference the farmer's specific crop and current growth stage.
5. Account for whether the farmer has irrigation or not.
6. Keep total response under 200 words.
7. Do NOT mention uncertainty or hedge excessively — farmers need clarity.
8. Do NOT recommend actions that require resources a smallholder would not have.
9. Start with the most urgent time-sensitive action.
10. End with one sentence about the next expected forecast update timeline."""
```

---

## 9. Prompt Templates

### Main Advice Generation Prompt

```python
ADVICE_PROMPT_TEMPLATE = """
CLIMATE ALERT FROM HUSIKA / ICPAC:
- Hazard: {hazard_type} ({severity} severity)
- Affected Area: {county}, {country}
- Forecast Window: {forecast_start} to {forecast_end}
- Alert Details: {alert_description}

FARMER PROFILE:
- Crop: {crop_type} ({crop_variety})
- Current Growth Stage: {growth_stage}
- Farm Size: {acreage} hectares
- Soil Type: {soil_type}
- Irrigation: {irrigation_status}
- Location: {sub_county}, {county}

AGRONOMIC KNOWLEDGE BASE (use this to ground your advice):
{rag_context}

TASK:
Based on the above alert and farmer profile, provide exactly 3 specific, 
actionable recommendations this farmer should take in the next 7 days to 
protect their {crop_type} crop at {growth_stage} stage from {hazard_type} risk.

Format your response EXACTLY as follows:
⚠️ {hazard_label} Alert — {county}

1. [Most urgent action — do this within 24-48 hours]
2. [Important action — do this within 3-5 days]  
3. [Preparatory action — do this within the next week]

📅 Next update from HUSIKA: {next_update_hint}
"""
```

### USSD Menu Template

```python
USSD_MAIN_MENU = """
CON AgroSense AI
{county} {hazard_type} Alert

{advice_summary_short}

1. Full advice (SMS)
2. Mark as helpful
3. Report ground conditions
4. Speak to extension officer
0. Exit
"""

USSD_FULL_ADVICE = """
CON {farmer_name}, your {crop_type} advice:

{advice_numbered}

Reply:
1. Send to me via SMS
2. Go back
0. Exit
"""
```

### Feedback Collection Prompt (SMS)

```python
FEEDBACK_SMS_TEMPLATE = """
AgroSense: 24hrs ago we sent {crop_type} advice for {hazard_type} alert in {county}.

Was it useful? Reply:
1 = Very helpful
2 = Somewhat helpful  
3 = Not helpful

Did weather match forecast?
A = Yes  B = No  C = Partly

Thank you — your reply improves advice for 18M farmers.
"""
```

### Translation Instructions

```python
TRANSLATION_SYSTEM_PROMPT = """
You are a professional agricultural translator specializing in East African languages.
Translate the following farm advisory message to {target_language}.

Important rules:
1. Preserve all numbered points (1. 2. 3.)
2. Keep technical agricultural terms accurate — do not simplify to the point of inaccuracy
3. Maintain the urgent, direct tone appropriate for an early warning message
4. Use common words familiar to rural farming communities
5. Preserve all emoji and formatting symbols
6. If a technical term has no direct translation, use the English term in parentheses
"""

# Language codes and names
SUPPORTED_LANGUAGES = {
    "en": "English",
    "sw": "Swahili (Kiswahili)",
    "so": "Somali (af Soomaali)",
    "am": "Amharic (አማርኛ)",
    "or": "Oromo (Afaan Oromoo)",
    "ar": "Arabic (العربية)",
    "fr": "French (Français)",
}
```

---

## 10. API Specification

All endpoints use JSON. Authentication via Bearer JWT unless noted. Base URL: `https://api.agrosense.ai/api/v1`

### 10.1 Webhook: Receive HUSIKA Alert

```
POST /webhooks/husika-alert
Authentication: HMAC-SHA256 header (X-HUSIKA-Signature)
Content-Type: application/json
```

**Request Body:**
```json
{
  "alert_id": "husika-2025-drought-ke-001",
  "hazard_type": "drought",
  "severity": "high",
  "title": "Drought Risk: High — Northern Kenya",
  "description": "Significantly below-normal rainfall expected across Marsabit, Turkana, and Wajir counties over the next 14 days. High likelihood of pasture deterioration and crop stress.",
  "affected_counties": ["Marsabit", "Turkana", "Wajir"],
  "affected_sub_counties": [],
  "forecast_valid_from": "2025-07-01",
  "forecast_valid_to": "2025-07-14",
  "source_model": "GFS-ICPAC",
  "confidence_level": "high",
  "issued_at": "2025-06-30T06:00:00Z"
}
```

**Response:**
```json
{
  "status": "accepted",
  "alert_id": "uuid-of-stored-alert",
  "farmers_matched": 312,
  "processing_job_id": "celery-task-uuid"
}
```

**HMAC Validation (Python):**
```python
import hmac
import hashlib

def validate_husika_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

---

### 10.2 Farmer Registration

```
POST /farmers
Authentication: Bearer JWT (org-level token)
```

**Request Body:**
```json
{
  "name": "Amina Hassan",
  "phone_number": "+254712345678",
  "county": "Marsabit",
  "sub_county": "Laisamis",
  "latitude": 1.6136,
  "longitude": 37.8166,
  "crop_type": "maize",
  "crop_variety": "H614D drought-tolerant",
  "acreage": 1.5,
  "planting_date": "2025-04-15",
  "soil_type": "clay_loam",
  "has_irrigation": false,
  "language_pref": "sw",
  "channel_pref": "whatsapp",
  "consent_given": true
}
```

**Response:**
```json
{
  "id": "farmer-uuid",
  "name": "Amina Hassan",
  "phone_number": "+254712345678",
  "county": "Marsabit",
  "crop_type": "maize",
  "growth_stage": "grain_fill",
  "created_at": "2025-06-30T09:00:00Z"
}
```

---

### 10.3 List Farmers

```
GET /farmers?county=Marsabit&crop_type=maize&is_active=true&limit=50&offset=0
Authentication: Bearer JWT
```

**Response:**
```json
{
  "total": 312,
  "limit": 50,
  "offset": 0,
  "data": [
    {
      "id": "farmer-uuid",
      "name": "Amina Hassan",
      "county": "Marsabit",
      "crop_type": "maize",
      "growth_stage": "grain_fill",
      "channel_pref": "whatsapp",
      "language_pref": "sw",
      "latitude": 1.6136,
      "longitude": 37.8166
    }
  ]
}
```

---

### 10.4 Trigger Advice Generation (Manual / Demo)

```
POST /advice/generate
Authentication: Bearer JWT
```

**Request Body:**
```json
{
  "alert_id": "alert-uuid",
  "farmer_ids": ["farmer-uuid-1", "farmer-uuid-2"],
  "override_channel": "whatsapp"
}
```

If `farmer_ids` is omitted, generates advice for ALL farmers matched to the alert's geographic scope.

---

### 10.5 Get Advice Records

```
GET /advice?alert_id=&farmer_id=&delivery_status=delivered&limit=20
Authentication: Bearer JWT
```

---

### 10.6 WhatsApp Incoming Handler

```
POST /channels/whatsapp/incoming
Authentication: None (Africa's Talking signed callback)
```

**Request Body (Africa's Talking format):**
```json
{
  "from": "+254712345678",
  "to": "+254700000000",
  "text": "1",
  "date": "2025-07-01T07:00:00"
}
```

---

### 10.7 USSD Session Handler

```
POST /channels/ussd
Authentication: None (Africa's Talking signed callback)
Content-Type: application/x-www-form-urlencoded
```

**Form fields:** `sessionId`, `serviceCode`, `phoneNumber`, `text`

**Response:** Plain text prefixed with `CON ` (continue session) or `END ` (end session).

---

### 10.8 Record Farmer Feedback

```
POST /feedback
Authentication: None (triggered by SMS reply parsing)
```

**Request Body:**
```json
{
  "phone_number": "+254712345678",
  "helpfulness_rating": 5,
  "weather_matched_forecast": true,
  "applied_advice": true,
  "raw_sms_reply": "1 A"
}
```

---

### 10.9 Analytics Summary

```
GET /analytics/summary?days=7&county=Marsabit
Authentication: Bearer JWT
```

**Response:**
```json
{
  "period_days": 7,
  "total_alerts_received": 3,
  "total_farmers_reached": 891,
  "total_advice_sent": 891,
  "delivery_rate_percent": 94.2,
  "whatsapp_sent": 623,
  "sms_sent": 268,
  "ussd_sessions": 142,
  "avg_delivery_time_seconds": 8.3,
  "feedback_responses": 312,
  "avg_helpfulness_rating": 4.2,
  "most_affected_counties": ["Marsabit", "Turkana", "Wajir"],
  "top_crop_types": ["maize", "sorghum", "beans"]
}
```

---

### 10.10 Demo Alert Trigger

```
POST /demo/trigger-alert
Authentication: Bearer JWT (admin only)
```

**Request Body:**
```json
{
  "hazard_type": "drought",
  "severity": "high",
  "counties": ["Marsabit", "Turkana"],
  "description": "Demo alert for hackathon presentation",
  "forecast_days": 14
}
```

Triggers the full pipeline with seeded demo farmers. Safe to use repeatedly during the demo.

---

## 11. Delivery Channel Handlers

### WhatsApp Message Format

```python
def format_whatsapp_message(advice_text: str, farmer_name: str, 
                             hazard_type: str, severity: str) -> str:
    severity_emoji = {
        "watch": "👀", "advisory": "📋", "low": "🟡",
        "medium": "🟠", "high": "🔴", "extreme": "🚨"
    }
    emoji = severity_emoji.get(severity, "⚠️")
    
    return f"""{emoji} *AgroSense AI — Climate Advisory*
Powered by HUSIKA / ICPAC

Dear {farmer_name},

{advice_text}

---
📱 Reply *HELP* for more information
📊 Reply *FEEDBACK* to rate this advice
🌐 husika.icpac.net for full forecast"""
```

### SMS Format (160-char limit awareness)

```python
def format_sms_message(advice_text: str) -> list[str]:
    """
    Split advice into multiple SMS messages if needed.
    Each SMS = 160 chars. Concatenated SMS = 153 chars per part.
    """
    MAX_SINGLE = 160
    MAX_CONCAT = 153
    
    if len(advice_text) <= MAX_SINGLE:
        return [advice_text]
    
    # Split into chunks of 153 chars
    parts = []
    total_parts = -(-len(advice_text) // MAX_CONCAT)  # ceiling division
    for i in range(0, len(advice_text), MAX_CONCAT):
        chunk = advice_text[i:i + MAX_CONCAT]
        parts.append(f"({i//MAX_CONCAT + 1}/{total_parts}) {chunk}")
    return parts
```

### USSD Session State Machine

```
States:
  MAIN_MENU → show alert summary + options
  VIEW_ADVICE → show full numbered advice
  SEND_SMS → trigger SMS delivery of full advice
  SUBMIT_FEEDBACK → collect helpfulness rating
  REPORT_CONDITIONS → structured observation form
  END → exit session

Transitions:
  MAIN_MENU + "1" → VIEW_ADVICE
  MAIN_MENU + "2" → SUBMIT_FEEDBACK
  MAIN_MENU + "3" → REPORT_CONDITIONS
  MAIN_MENU + "0" → END
  VIEW_ADVICE + "1" → SEND_SMS
  VIEW_ADVICE + "2" → MAIN_MENU
  VIEW_ADVICE + "0" → END
  SUBMIT_FEEDBACK + [1-5] → record + MAIN_MENU
```

---

## 12. Frontend Specification

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard Home | `/` | Summary cards + recent alerts + live feed |
| Farmers | `/farmers` | Table + map + bulk registration |
| Alerts | `/alerts` | Alert list + advice generation status |
| Advice Log | `/advice` | Full audit trail of all advice sent |
| Analytics | `/analytics` | Charts: reach, delivery, feedback over time |
| Settings | `/settings` | Organization config, API keys, webhook URL |
| Demo | `/demo` | Hackathon demo trigger interface |

### Summary Cards (Dashboard)

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Registered      │  │ Alerts (7 days) │  │ Advice Sent     │  │ Avg Helpfulness │
│ Farmers         │  │                 │  │                 │  │                 │
│   18,432        │  │       12        │  │   14,891        │  │    4.2 / 5.0    │
│ +234 this week  │  │  3 high risk    │  │  94% delivered  │  │  312 responses  │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Demo Page (`/demo`)

The demo page must be impressive and simple:

1. **Alert Simulator Panel** — dropdowns for: hazard type, severity, county selection
2. **Pipeline Visualizer** — real-time log showing each pipeline step as it executes
3. **Advice Preview** — shows the generated advice message in English + translated
4. **WhatsApp Preview** — mockup of how it looks on a phone
5. **Metrics Bar** — farmers matched, advice sent, delivery time

---

## 13. Security Requirements

### Authentication

```python
# JWT Configuration
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 60
JWT_REFRESH_TOKEN_EXPIRE_DAYS = 7

# Roles
ROLES = {
    "icpac_admin": ["*"],                          # All permissions
    "national_entity": ["farmers.*", "alerts.read", "advice.*", "analytics.read"],
    "ngo_admin": ["farmers.*", "advice.read", "analytics.read"],
    "readonly": ["alerts.read", "analytics.read"],
}
```

### Rate Limiting (Redis-backed)

```python
RATE_LIMITS = {
    "public_endpoints": "100/minute",
    "authenticated_endpoints": "1000/minute",
    "webhook_receiver": "500/minute",
    "llm_calls": "50 concurrent",
    "sms_per_farmer_per_day": 3,
    "whatsapp_per_farmer_per_day": 5,
}
```

### OWASP Mitigations

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | SQLAlchemy ORM with parameterized queries only. Never string-format SQL. |
| XSS | CSP headers. React/Next.js auto-escapes output. |
| Broken Auth | JWT expiry 60min, refresh rotation, session invalidation on password change. |
| IDOR | All farmer/advice records validated against org_id of authenticated user. |
| Security Misconfiguration | CORS restricted to known frontend origins. Debug mode off in production. |
| Cryptographic Failures | AES-256 for PII at rest. TLS 1.3 for all transport. Bcrypt for passwords. |
| SSRF | Whitelist all outbound HTTP calls. No user-controlled URLs. |
| Sensitive Data Exposure | Phone numbers encrypted at rest. Hashed for analytics. PII redacted from logs. |

### Security Headers (FastAPI middleware)

```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

# Add to app
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["api.agrosense.ai", "localhost"])

# Security headers via custom middleware
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}
```

---

## 14. Docker & Infrastructure

### `docker-compose.yml`

```yaml
version: "3.9"

services:
  db:
    image: pgvector/pgvector:pg15
    environment:
      POSTGRES_USER: agrosense
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      POSTGRES_DB: agrosense_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agrosense"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    env_file: .env
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: celery -A app.worker worker --loglevel=info --concurrency=4
    volumes:
      - ./backend:/app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    env_file: .env
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=hackathon
    volumes:
      - n8ndata:/home/node/.n8n

volumes:
  pgdata:
  redisdata:
  n8ndata:
```

### `backend/Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### `backend/requirements.txt`

```
fastapi==0.110.0
uvicorn[standard]==0.29.0
sqlalchemy[asyncio]==2.0.29
alembic==1.13.1
asyncpg==0.29.0
psycopg2-binary==2.9.9
pydantic==2.6.4
pydantic-settings==2.2.1
langchain==0.2.0
langchain-openai==0.1.6
langchain-community==0.2.0
openai==1.23.2
pgvector==0.2.5
celery[redis]==5.3.6
redis==5.0.3
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.9
httpx==0.27.0
deepl==1.17.0
africastalking==1.2.5
python-dotenv==1.0.1
```

---

## 15. Build Order & Sprint Plan

### Hackathon Sprint Plan (36 Hours)

```
Hour 0–2:   Environment setup
Hour 2–6:   Database + core models
Hour 6–10:  AI pipeline (RAG + LLM)
Hour 10–14: HUSIKA webhook receiver
Hour 14–18: Africa's Talking integration
Hour 18–22: Frontend dashboard
Hour 22–26: Demo page + seeding
Hour 26–30: End-to-end testing
Hour 30–33: Polish + security audit
Hour 33–36: Deployment + demo rehearsal
```

### Detailed Task List

#### Sprint 1: Foundation (Hour 0–6)

```
[ ] git init + monorepo structure
[ ] Copy folder structure from spec
[ ] docker-compose up -d (db + redis)
[ ] alembic init + run migrations (all tables)
[ ] FastAPI app skeleton (main.py, routers, models)
[ ] POST /farmers endpoint working
[ ] GET /farmers endpoint working
[ ] JWT auth middleware
[ ] Health check endpoint: GET /health
[ ] Seed 3 organizations into DB
[ ] Seed 50 demo farmers across Marsabit, Turkana, Wajir
```

#### Sprint 2: AI Core (Hour 6–14)

```
[ ] Download 10+ CIMMYT/FAO PDF documents into /docs folder
    Sources:
    - https://www.cimmyt.org/publication/ (drought stress maize)
    - https://www.fao.org/3/i3760e/i3760e.pdf (drought resistance)
    - https://cgspace.cgiar.org (East Africa climate adaptation)
[ ] scripts/seed_rag.py — chunk + embed all docs into pgvector
[ ] app/ai/rag.py — pgvector similarity search function
[ ] app/ai/advisor.py — LangChain pipeline (context → RAG → LLM → advice)
[ ] app/ai/translator.py — DeepL API wrapper with fallback
[ ] Test: generate advice for 1 farmer + 1 drought alert
[ ] Validate output format (3 numbered recommendations)
```

#### Sprint 3: Webhook + Delivery (Hour 14–22)

```
[ ] POST /webhooks/husika-alert with HMAC validation
[ ] Alert stored to DB
[ ] Geographic farmer matching query
[ ] Celery task: process_alert_for_farmers(alert_id)
[ ] app/channels/whatsapp.py — Africa's Talking WhatsApp send
[ ] app/channels/sms.py — Africa's Talking SMS send
[ ] app/channels/ussd.py — USSD session state machine
[ ] POST /channels/whatsapp/incoming — reply handler
[ ] POST /channels/ussd — session handler
[ ] Delivery status webhook from Africa's Talking
[ ] Test: real WhatsApp message sent to test number
[ ] POST /demo/trigger-alert endpoint
```

#### Sprint 4: Frontend (Hour 22–30)

```
[ ] npx create-next-app frontend --typescript --tailwind
[ ] Dashboard layout (sidebar + top nav)
[ ] Summary cards component (4 KPI cards)
[ ] Alert feed table
[ ] Advice log table with delivery status badges
[ ] Farmer registration form
[ ] Farmer map (Leaflet + OpenStreetMap)
[ ] Analytics charts (Recharts — line + bar + donut)
[ ] Demo page with pipeline visualizer
[ ] WhatsApp message preview mockup
[ ] Connect all to backend API
```

#### Sprint 5: Polish + Deploy (Hour 30–36)

```
[ ] End-to-end test: trigger demo alert → WhatsApp message arrives
[ ] Seed 500 farmers for impressive demo metrics
[ ] Deploy backend to Railway (railway up)
[ ] Deploy frontend to Vercel (vercel deploy)
[ ] Set all env vars in Railway + Vercel dashboards
[ ] Run security checklist (CORS, rate limits, HMAC)
[ ] Prepare demo script — practice 3 times
[ ] Prepare 8-slide pitch deck
[ ] README.md with setup instructions
```

---

## 16. Demo Data & Seeding

### Seed Script (`scripts/seed_farmers.py`)

```python
"""
Run: python scripts/seed_farmers.py
Seeds 500 demo farmers for hackathon presentation.
"""

import asyncio
from datetime import date, timedelta
import random

DEMO_FARMERS = [
    # (name, phone, county, sub_county, lat, lon, crop, planting_days_ago, language)
    ("Amina Hassan", "+254712000001", "Marsabit", "Laisamis", 1.61, 37.82, "maize", 80, "sw"),
    ("John Kamau", "+254722000002", "Turkana", "Lodwar", 3.11, 35.60, "sorghum", 65, "sw"),
    ("Fatuma Ali", "+254733000003", "Wajir", "Wajir East", 1.74, 40.06, "beans", 45, "so"),
    ("Abdi Mohamed", "+254744000004", "Marsabit", "Moyale", 3.52, 39.05, "maize", 90, "so"),
    ("Grace Auma", "+256701000005", "Karamoja", "Kotido", 2.98, 34.10, "millet", 55, "en"),
    # ... generate 495 more programmatically
]

COUNTIES_KENYA = ["Marsabit", "Turkana", "Wajir", "Mandera", "Garissa", "Isiolo", "Samburu"]
COUNTIES_ETHIOPIA = ["Oromia", "Somali Region", "SNNPR", "Afar"]
COUNTIES_UGANDA = ["Karamoja", "Acholi", "Lango"]

CROPS = ["maize", "sorghum", "millet", "beans", "cowpea", "cassava"]
SOILS = ["clay_loam", "sandy", "loam", "clay"]
LANGUAGES = ["sw", "so", "am", "en", "or"]
CHANNELS = ["whatsapp", "sms", "ussd"]

async def seed():
    # Insert 500 farmers with realistic distribution
    # 60% Kenya, 25% Ethiopia, 15% Uganda
    # 40% maize, 30% sorghum, 20% millet, 10% other
    # 70% WhatsApp, 20% SMS, 10% USSD
    pass

if __name__ == "__main__":
    asyncio.run(seed())
```

### RAG Documents to Download

Prioritize these sources for the knowledge base:

```
1. CIMMYT — Drought-Tolerant Maize for Africa
   URL: https://www.cimmyt.org/projects/drought-tolerant-maize-for-africa-dtma/

2. FAO — Coping with Water Scarcity in Agriculture
   URL: https://www.fao.org/3/i3760e/i3760e.pdf

3. CGIAR — Climate-Smart Agriculture in East Africa
   URL: https://cgspace.cgiar.org/

4. ICRISAT — Sorghum and Millet Drought Management
   URL: https://www.icrisat.org/

5. FAO — Field Crops in Drought Conditions
   URL: https://www.fao.org/drought/en/

6. KALRO Kenya — Maize Production Guide
   URL: https://www.kalro.org/

7. CIMMYT — Bean Drought Stress Management
   URL: https://www.cimmyt.org/

8. IFAD — Pastoralist Drought Response Strategies
   URL: https://www.ifad.org/en/

9. ACRE Africa — Drought Index Insurance Guide
   URL: https://acreafrica.com/

10. WFP VAM — Food Security and Drought Correlation East Africa
    URL: https://www.wfp.org/publications
```

---

## 17. Testing Checklist

### Core Pipeline Tests

```python
# tests/test_pipeline.py

async def test_webhook_receives_alert():
    """POST /webhooks/husika-alert returns 200 and matches farmers"""
    pass

async def test_rag_retrieval():
    """RAG returns 5 relevant chunks for drought + maize query"""
    pass

async def test_advice_generation():
    """LLM generates exactly 3 numbered recommendations"""
    pass

async def test_translation_swahili():
    """Advice translated to Swahili preserves formatting"""
    pass

async def test_whatsapp_delivery():
    """WhatsApp message sent via Africa's Talking sandbox"""
    pass

async def test_ussd_menu_flow():
    """USSD state machine handles all menu paths"""
    pass

async def test_feedback_collection():
    """Farmer SMS reply "1 A" parsed correctly"""
    pass

async def test_analytics_summary():
    """Analytics endpoint returns correct aggregated counts"""
    pass

async def test_demo_trigger():
    """Demo endpoint triggers full pipeline with seeded farmers"""
    pass
```

### Security Tests

```
[ ] Webhook rejects requests with invalid HMAC signature
[ ] JWT token expired → 401 response
[ ] Cross-org farmer access → 403 response
[ ] Rate limit exceeded → 429 response with Retry-After header
[ ] SQL injection attempt in farmer name → rejected by ORM
[ ] PII not present in application logs
```

### Demo Reliability Tests

```
[ ] Demo trigger works 5 times in a row without errors
[ ] WhatsApp message arrives within 15 seconds
[ ] Pipeline visualizer shows real-time progress
[ ] Analytics update after each demo run
[ ] All 500 seeded farmers survive DB restart
```

---

## 18. AI Agent Instructions

> **This section is for AI coding assistants.** If you are an LLM being asked to build this project, follow these instructions precisely.

### If You Are Starting the Build

1. **Read this entire spec first** before writing any code.
2. **Start with the database schema** (Section 7). Run migrations before building any API.
3. **Build and test each layer independently** before integrating.
4. **Use the exact technology versions** specified in Section 5.
5. **Never hardcode secrets**. Always use environment variables from Section 6.

### Code Style Rules

```python
# Use async/await for ALL database and HTTP calls
async def get_farmer(farmer_id: UUID, db: AsyncSession) -> Farmer:
    result = await db.execute(select(Farmer).where(Farmer.id == farmer_id))
    return result.scalar_one_or_none()

# Use Pydantic models for ALL request/response validation
class FarmerCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    phone_number: str = Field(..., pattern=r'^\+[1-9]\d{1,14}$')
    crop_type: CropTypeEnum
    county: str
    language_pref: LanguageEnum = LanguageEnum.EN

# Use dependency injection for DB sessions
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

### AI Pipeline Code Pattern

```python
# app/ai/advisor.py — Main advice generation function

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import PGVector
from langchain.schema import SystemMessage, HumanMessage
from app.core.config import get_settings

settings = get_settings()

async def generate_farm_advice(
    alert: Alert,
    farmer: Farmer,
    growth_stage: str,
) -> tuple[str, list[str]]:
    """
    Generate personalized farm advice for a farmer given an alert.
    Returns: (advice_text_english, list_of_rag_source_names)
    """
    # 1. Build RAG query
    rag_query = build_rag_query(
        hazard_type=alert.hazard_type,
        severity=alert.severity,
        crop_type=farmer.crop_type,
        growth_stage=growth_stage,
        has_irrigation=farmer.has_irrigation or False
    )
    
    # 2. Retrieve relevant knowledge
    embeddings = OpenAIEmbeddings(model=settings.openai_embedding_model)
    vectorstore = PGVector(
        embedding_function=embeddings,
        collection_name="crop_knowledge",
        connection_string=settings.database_url
    )
    
    docs = vectorstore.similarity_search(rag_query, k=5)
    rag_context = "\n\n".join([f"[{doc.metadata.get('source', 'Unknown')}]\n{doc.page_content}" 
                                for doc in docs])
    rag_sources = [doc.metadata.get('source', 'Unknown') for doc in docs]
    
    # 3. Build prompt
    prompt = ADVICE_PROMPT_TEMPLATE.format(
        hazard_type=alert.hazard_type,
        severity=alert.severity,
        county=farmer.county,
        country=farmer.country,
        forecast_start=alert.forecast_valid_from,
        forecast_end=alert.forecast_valid_to,
        alert_description=alert.alert_description or "",
        crop_type=farmer.crop_type,
        crop_variety=farmer.crop_variety or farmer.crop_type,
        growth_stage=growth_stage,
        acreage=farmer.acreage or "unknown",
        soil_type=farmer.soil_type or "unknown",
        irrigation_status="with irrigation access" if farmer.has_irrigation else "rainfed (no irrigation)",
        sub_county=farmer.sub_county or farmer.county,
        rag_context=rag_context,
        hazard_label=alert.hazard_type.replace("_", " ").title(),
        next_update_hint="Check HUSIKA app in 48 hours for updated forecast."
    )
    
    # 4. Call LLM
    llm = ChatOpenAI(
        model=settings.openai_model,
        temperature=settings.openai_temperature,
        max_tokens=settings.openai_max_tokens
    )
    
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=prompt)
    ]
    
    response = await llm.ainvoke(messages)
    advice_text = response.content.strip()
    
    # 5. Validate output has 3 recommendations
    if not any(f"{i}." in advice_text for i in [1, 2, 3]):
        # Retry once with explicit format reminder
        messages.append(HumanMessage(content="Please ensure your response contains exactly 3 numbered points (1. 2. 3.)"))
        response = await llm.ainvoke(messages)
        advice_text = response.content.strip()
    
    return advice_text, rag_sources
```

### Critical Don'ts

```
❌ DO NOT use synchronous database calls (use async SQLAlchemy)
❌ DO NOT store raw phone numbers in logs
❌ DO NOT catch bare exceptions — always be specific
❌ DO NOT commit .env file to Git
❌ DO NOT use string formatting for SQL queries
❌ DO NOT skip the HMAC validation on HUSIKA webhook
❌ DO NOT call the LLM with temperature > 0.5 for advice (too creative = dangerous)
❌ DO NOT skip the output validation step after LLM generation
❌ DO NOT use deprecated LangChain v0.1 syntax (use v0.2+)
❌ DO NOT block the main event loop with CPU-intensive tasks (use Celery)
```

### Critical Do's

```
✅ Use connection pooling for PostgreSQL (asyncpg pool)
✅ Implement exponential backoff on all external API calls
✅ Log every pipeline step with structured JSON logging
✅ Test the demo trigger endpoint before the actual demo
✅ Pre-warm the RAG index before the demo (cold start = slow)
✅ Cache the top 10 most common (hazard, crop) combinations in Redis
✅ Have a fallback LLM (Gemini) if OpenAI rate limits
✅ Seed demo data before the hackathon presentation
✅ Test WhatsApp delivery with a real number 2 hours before demo
✅ Monitor Celery worker status during the live demo
```

---

## Appendix A: HUSIKA Integration Notes

- HUSIKA webhooks may use a different payload format than documented above. **Validate the exact format with ICPAC/Bunifu Technologies team at the hackathon.**
- If no webhook is available, poll the HUSIKA alert feed every 5 minutes using a scheduled Celery beat task.
- HUSIKA's geographic units use county names in English. Match carefully — "Wajir County" and "Wajir" should both resolve.
- The HUSIKA survey module API endpoint for submitting feedback should be confirmed with the team. Use `POST /api/surveys/responses` as a default assumption.

## Appendix B: Africa's Talking Setup

1. Create account at sandbox.africastalking.com
2. Use sandbox credentials during development
3. Register WhatsApp Business API with AT before the hackathon
4. USSD shortcodes: request a shared code (`*384*<product-code>#`) from AT
5. SMS sender ID `AgroSense` requires approval — use alphanumeric or short code as fallback

## Appendix C: Supported Languages and DeepL Codes

| Language | Code | DeepL Code | Notes |
|----------|------|-----------|-------|
| English | en | EN | Source language |
| Swahili | sw | not in DeepL | Use Google Translate |
| Somali | so | not in DeepL | Use Google Translate |
| Amharic | am | not in DeepL | Use Google Translate |
| Oromo | or | not in DeepL | Use Google Translate |
| Arabic | ar | AR | DeepL supported |
| French | fr | FR | DeepL supported |

For Swahili, Somali, Amharic, and Oromo: use Google Cloud Translation API (`translate.googleapis.com`).

## Appendix D: Key External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| HUSIKA Platform | https://husika.icpac.net | Parent platform |
| HUSIKA App | https://app.husika.io | Mobile/web app |
| ICPAC | https://www.icpac.net | Data and alerts source |
| EA Hazards Watch | https://eahazardswatch.icpac.net | Multi-hazard data |
| Africa's Talking | https://africastalking.com | SMS/WhatsApp/USSD API |
| CIMMYT | https://www.cimmyt.org | Maize/wheat crop knowledge |
| FAO GIEWS | https://www.fao.org/giews | Food security early warning |
| CGIAR | https://cgspace.cgiar.org | Agricultural research |
| OpenStreetMap | https://www.openstreetmap.org | Base maps |
| pgvector | https://github.com/pgvector/pgvector | Vector similarity search |

---

*AgroSense AI — Completing the last mile of the early warning chain.*
*Built on HUSIKA / ICPAC | Powered by AI | Serving the Greater Horn of Africa*
