-- ============================================================
-- Criminal Network Analyser — Initial PostgreSQL Schema
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Users & RBAC ─────────────────────────────────────────────
CREATE TABLE users (
    user_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name   TEXT NOT NULL,
    role        TEXT NOT NULL CHECK (role IN ('admin','senior_investigator','investigator','analyst')),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Cases ─────────────────────────────────────────────────────
CREATE TABLE cases (
    case_id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number TEXT UNIQUE NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    status      TEXT DEFAULT 'active' CHECK (status IN ('active','closed','archived')),
    investigation_type TEXT DEFAULT 'default'
                    CHECK (investigation_type IN ('default','financial_crime','organized_crime','narcotics')),
    created_by  UUID REFERENCES users(user_id),
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Ingested Documents ────────────────────────────────────────
CREATE TABLE documents (
    doc_id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id         UUID REFERENCES cases(case_id),
    original_name   TEXT NOT NULL,
    storage_path    TEXT NOT NULL,
    source_type     TEXT NOT NULL,   -- FIR, INTEL_REPORT, SURVEILLANCE, etc.
    detected_lang   TEXT,
    processing_status TEXT DEFAULT 'pending'
                      CHECK (processing_status IN ('pending','processing','completed','failed')),
    uploaded_by     UUID REFERENCES users(user_id),
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ── Audit Logs ────────────────────────────────────────────────
CREATE TABLE audit_logs (
    log_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(user_id),
    action      TEXT NOT NULL,       -- VIEW, SEARCH, EXPORT, UPLOAD, etc.
    resource_type TEXT,              -- case, entity, criminal_history, socmint, etc.
    resource_id TEXT,
    case_id     UUID REFERENCES cases(case_id),
    ip_address  TEXT,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Priority Scores (cached from scoring engine) ──────────────
CREATE TABLE priority_scores (
    score_id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id     UUID REFERENCES cases(case_id),
    entity_type TEXT NOT NULL CHECK (entity_type IN ('person','organization')),
    entity_id   TEXT NOT NULL,       -- Neo4j node ID
    score       NUMERIC(5,2) NOT NULL,
    weight_profile TEXT DEFAULT 'default',
    factors     JSONB,               -- contributing factors breakdown
    calculated_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_case_id ON audit_logs(case_id);
CREATE INDEX idx_documents_case_id ON documents(case_id);
CREATE INDEX idx_scores_case_entity ON priority_scores(case_id, entity_type, entity_id);
