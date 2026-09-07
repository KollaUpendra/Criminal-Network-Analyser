# AI-Powered Criminal Network Analysis & Investigation System (v2)

An AI-powered investigation platform that converts **FIRs, police reports, intelligence agency reports, call records, bank transactions, vehicle information, surveillance reports, social media intelligence, criminal history records, and other investigation data** into a unified, searchable criminal-network intelligence system.

The platform uses **OCR, multilingual translation, NLP, Named Entity Recognition (NER), graph analytics, anomaly detection, and risk/priority scoring** to help investigators discover relationships and suspicious patterns among **people, organizations, locations, and events** that may be difficult to identify manually.

---

## 🚨 Problem Statement

Criminal investigations often involve large amounts of disconnected information across:

* FIRs and police reports
* **Intelligence agency reports**
* Call Detail Records (CDRs)
* Bank / financial transaction records
* Vehicle information
* **Surveillance reports** (physical surveillance logs, CCTV metadata, stakeout notes)
* **Social media intelligence (SOCMINT)**
* **Criminal history databases** (prior FIRs, convictions, case outcomes)
* Addresses and locations
* Organizations
* Multiple criminal cases

This information is **unstructured, multilingual, fragmented across systems**, and involves not just individuals but the **organizations, locations, and events** that connect them. Investigators need a way to move from fragmented records to a connected, explainable picture — one that treats organizations as seriously as people when tracing networks.

---

# 🎯 Objectives

1. Collect investigation data from **all mandated source types**, including surveillance, SOCMINT, criminal history, and intelligence agency reports.
2. Process documents written in different Indian languages.
3. Translate non-English content into English for unified analysis.
4. Extract entities — people, **organizations**, locations, vehicles, phone numbers, accounts, events.
5. Identify relationships between entities, **including organization-to-organization and organization-to-person links**.
6. Build an interactive criminal-network graph in which **organizations are first-class analytical nodes**.
7. Detect suspicious activities and unusual patterns — communication, financial, movement, **and organizational**.
8. Identify highly connected and influential individuals **and organizations**.
9. Incorporate **prior criminal history** as a scoring input, with full traceability.
10. Generate an explainable analytical risk/priority score.
11. Provide investigators with a centralized investigation dashboard.
12. Maintain traceability from every AI-generated insight back to its original source.

---

# 💡 Proposed Solution — Updated Pipeline

```text
Data Collection
 (FIRs, Police & Intelligence Reports, CDRs, Bank Records,
  Vehicle Records, Surveillance Reports, SOCMINT, Criminal History)
      ↓
Document / Feed Processing
      ↓
OCR / Text Extraction  (documents)
Structured Feed Parsing (CDRs, transactions, surveillance logs, social posts)
      ↓
Language Detection
      ↓
Translation
      ↓
NLP / Entity Extraction  (Person, Organization, Location, Vehicle, Event, Account)
      ↓
Relationship Extraction  (Person↔Person, Person↔Org, Org↔Org, Person/Org↔Location/Event)
      ↓
Entity Resolution (incl. criminal-history linkage)
      ↓
Knowledge Graph
      ↓
Graph Analytics  (Person-level AND Organization-level)
      ↓
Anomaly Detection  (Communication, Financial, Movement, Surveillance, Social, Organizational)
      ↓
Risk / Priority Scoring  (Person AND Organization scores)
      ↓
Investigation Dashboard
```

---

# 🌐 Multilingual & Multi-Format Intake

Documents (FIRs, intelligence reports, surveillance logs) may be in Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, or other Indian languages; social media content may mix language and script (code-mixing, transliteration).

```text
Document / Post
      ↓
OCR (if scanned) / Direct text (if digital)
      ↓
Language Detection
      ↓
Indian Language Translation (Sarvam API)
      ↓
English Text
      ↓
NLP Processing
```

The original document/post should always be preserved alongside the translated version, with source metadata intact (platform, handle, timestamp, geotag where available).

---

# 🔍 Core Features (Updated)

## 1. Data Collection — Expanded Source Set

### Supported Data Sources

| Category | Examples | Format |
|---|---|---|
| FIRs & Police Reports | Case FIRs, station diaries | PDF, scanned image, DOCX |
| **Intelligence Agency Reports** | Threat assessments, agency intel briefs, watch-list updates | PDF, DOCX, structured feed |
| Call Detail Records (CDRs) | Call logs, tower dumps | CSV, DB import |
| Bank / Financial Transactions | Transfers, account statements | CSV, JSON, API |
| Vehicle Records | RTO registration, ANPR hits | CSV, API |
| **Surveillance Reports** | Field surveillance logs, stakeout notes, CCTV/ANPR metadata, tail reports | PDF, DOCX, structured logs, JSON metadata |
| **Social Media Intelligence (SOCMINT)** | Public posts, group memberships, connection graphs, geotags, flagged accounts | JSON/API export, structured scrape (via authorized/lawful channel only) |
| **Criminal History Database** | Prior FIRs, convictions, case outcomes, known associates, prior addresses | Database import, API |
| Location Information | Addresses, coordinates | CSV, JSON |
| Organization Information | Company registries, NGO records, shell-entity filings | CSV, JSON, DB import |

### Data Sources (Ingestion Channels)

* File upload (PDF, DOC/DOCX, image)
* CSV / JSON
* Database imports
* **Authorized law-enforcement and intelligence APIs** (CDR providers, bank reporting units, RTO, criminal records bureau, social media lawful-request channels)
* **Structured surveillance feeds** (CCTV metadata streams, ANPR feeds, field-report forms)

> **Note on SOCMINT and surveillance data:** These sources carry heightened privacy sensitivity. Ingestion must go through the same **authorization, purpose-limitation, and audit-logging controls** described in the Security & Privacy section — no open-ended scraping, and all lawful-access requirements for the relevant jurisdiction apply.

---

## 2. OCR and Document Processing

Unchanged in principle, now also applied to **scanned surveillance logs and intelligence report attachments**, not just FIRs.

```text
Scanned Document / Log
      ↓
OCR
      ↓
Extracted Text
      ↓
Language Detection
      ↓
Translation / NLP
```

---

## 3. Structured Feed Processing (New)

Not all new sources are documents — CDRs, transactions, ANPR hits, and social media exports arrive as **structured or semi-structured feeds**. These bypass OCR/translation and go straight into schema-mapped ingestion:

```text
Structured Feed (CDR / Transaction / ANPR / Social Export)
      ↓
Schema Mapping & Validation
      ↓
Deduplication
      ↓
Entity Extraction (direct field mapping + NLP on free-text fields)
      ↓
Knowledge Graph
```

---

## 4. Entity Extraction — Expanded Entity Set

### Person
```text
Ravi Kumar
Suresh Reddy
```

### Organization *(elevated to first-class entity — see Section 7A)*
```text
ABC Trading Company
XYZ Foundation
Shell Entity Pvt Ltd
```

### Phone Number
```text
9876543210
```

### Vehicle
```text
TS09AB1234
```

### Location
```text
Hyderabad
Secunderabad
```

### Bank Account
```text
XXXX1234
```

### Transaction
```text
₹50,000
```

### **Criminal History Record (New)**
```text
Prior FIR: FIR#2021/0456
Offense: Extortion
Case Outcome: Convicted
Associated Persons: Suresh Reddy, Person D
```

### **Surveillance Observation (New)**
```text
Observed: Person A meets Person C
Location: Warehouse, Secunderabad
Method: Field surveillance / CCTV
Timestamp: 2026-08-14 21:40
```

### **Social Media Signal (New)**
```text
Account: @handle_xyz
Platform: X / Instagram / Telegram (public channel)
Connection: Follows / Member of Group G
Content Flag: Reference to "consignment", geotagged post near Location Z
```

### Event
```text
Phone Call
Money Transfer
Meeting
Vehicle Movement
Surveillance Sighting
Social Media Interaction
```

---

## 5. Relationship Extraction — Organization-Aware

```text
Ravi ──── calls ──────→ Suresh
Ravi ──── transfers ──→ Account A
Ravi ──── director_of →  ABC Trading Company
ABC Trading Company ── shares_registered_address → XYZ Foundation
ABC Trading Company ── transacts_with → Shell Entity Pvt Ltd
Suresh ─── has_prior_case → FIR#2021/0456
Person A ── observed_with → Person C   (via surveillance)
Account_@handle_xyz ── linked_to → Person A   (via SOCMINT resolution)
```

### Relationship Types (Expanded)

| Category | Relationships |
|---|---|
| Personal / Communication | CALLS, MEETS, SHARES_PHONE |
| Financial | TRANSFERRED_TO, OWNS_ACCOUNT, TRANSACTS_WITH |
| Physical / Asset | OWNS_VEHICLE, LIVES_AT, VISITED |
| **Organizational (New)** | DIRECTOR_OF, EMPLOYEE_OF, SHAREHOLDER_OF, REGISTERED_AT_SAME_ADDRESS, TRANSACTS_WITH (org↔org), FRONT_FOR (flagged, low-confidence) |
| **Criminal History (New)** | HAS_PRIOR_CASE, CO_ACCUSED_WITH, CONVICTED_OF |
| **Surveillance (New)** | OBSERVED_WITH, OBSERVED_AT, TAILED_TO |
| **Social (New)** | FOLLOWS, MEMBER_OF_GROUP, MENTIONED_WITH, GEOTAGGED_NEAR |
| Case | MENTIONED_IN, ASSOCIATED_WITH_CASE |

---

## 6. Criminal Network Graph — Nodes & Edges (Updated)

### Nodes

```text
Person
Organization        ← now analyzed with the same depth as Person
Phone
Vehicle
Bank Account
Location
Case / FIR
Event
CriminalHistoryRecord   ← new
SurveillanceObservation ← new
SocialMediaAccount      ← new
```

### Edges (superset)

```text
CALLS
TRANSFERRED_TO
OWNS
USES
VISITED
LOCATED_AT
DIRECTOR_OF / EMPLOYEE_OF / SHAREHOLDER_OF        ← new (org)
REGISTERED_AT_SAME_ADDRESS / FRONT_FOR             ← new (org)
HAS_PRIOR_CASE / CO_ACCUSED_WITH                   ← new (criminal history)
OBSERVED_WITH / OBSERVED_AT                        ← new (surveillance)
FOLLOWS / MEMBER_OF_GROUP / GEOTAGGED_NEAR         ← new (social)
MENTIONED_IN
ASSOCIATED_WITH
```

---

## 7. Interactive Investigation Graph

Same graph operations as before (search, zoom, filter, trace paths), with new filter dimensions:

```text
Filter:
Entity Type = Organization
Relationship = TRANSACTS_WITH
Date = Jan 2026 - Mar 2026
```

```text
Filter:
Source Type = Surveillance | SOCMINT | Criminal History
Confidence ≥ 0.7
```

---

## 7A. Organizations as First-Class Network Entities *(new dedicated section)*

Previously organizations were a node type mentioned in passing. In v2, organizations receive the **same analytical treatment as individuals**:

### Organization Centrality
```text
Organization X → 14 linked entities (persons + orgs)
Organization Y → 3 linked entities
```
An organization with an unusually high number of person/organization links relative to its declared business scope is flagged for review.

### Organization Betweenness
Identifies organizations acting as a **bridge** between otherwise unconnected criminal groups or cases — e.g., a shell company that receives funds from Group A and disburses to Group B.

### Organization Community Detection
Groups organizations that share directors, registered addresses, auditors, or repeated transaction counterparties — useful for surfacing **shell-company clusters**.

### Organization-Specific Anomalies
* Newly registered organization with immediate high-value transactions
* Multiple organizations sharing one registered address or director
* Circular fund flow between related organizations
* Organization with no public operational footprint but active financial links to flagged individuals

### Person↔Organization Combined View
The dashboard surfaces a combined score: a person's individual priority score, plus a rollup of the risk carried by organizations they are linked to (director, shareholder, or frequent counterparty).

---

## 8. Suspicious Pattern Detection — Expanded Categories

### Communication Anomalies (unchanged)
### Financial Anomalies (unchanged)
### Movement Anomalies (unchanged)

### **Surveillance-Derived Anomalies (New)**
* Repeated sightings of unrelated persons at the same location
* Surveillance-observed meeting immediately preceding a financial transaction
* Pattern of counter-surveillance behavior (route changes, evasive movement) noted in field logs

### **Social Media Anomalies (New)**
* Sudden new connections between previously unrelated flagged accounts
* Coordinated posting patterns across multiple accounts (possible coordinated network)
* Geotags placing a flagged account near a surveillance or crime-scene location within a short time window

### **Organizational Anomalies (New — see 7A)**
* Shell-company clustering
* Circular inter-organization transfers
* Director overlap across otherwise unrelated flagged organizations

### Network Anomalies (unchanged, now spans persons + organizations)

---

## 9. Timeline Analysis — Multi-Source Correlation

```text
09:10 AM   Social post by @handle_xyz geotagged near Location Z
10:30 AM   Person A calls Person B
11:15 AM   Surveillance log: Person B observed meeting Person C at Location X
12:00 PM   ₹2,00,000 transferred: Person A → Shell Entity Pvt Ltd
01:30 PM   Person C calls Person A
```

Timeline correlation now spans:

```text
Communication + Movement + Financial Activity
      +
Surveillance Observations + Social Media Activity
      +
Case Events
```

---

## 10. Analytical Risk / Priority Score — Updated Weighting Model

```text
                    Score
                      ↓
   ┌───────┬──────────┬──────────┬───────────┬────────────┐
   │       │          │          │           │            │
Comm.   Financial  Movement  Surveillance  Social      Criminal
Activity  Activity  Anomalies   Signals     Signals     History
   │       │          │          │           │            │
   └───────┴──────────┴──────────┴───────────┴────────────┘
                      ↓
                Risk Engine
                      ↓
         Priority Score (Person AND Organization)
```

| Indicator | Example Weight |
|---|---:|
| Network connections (person + org) | 20% |
| Financial anomalies | 25% |
| Communication activity | 15% |
| Movement anomalies | 10% |
| **Surveillance-derived signals** | 10% |
| **Social media signals** | 5% |
| **Prior criminal history** | 10% |
| Case associations | 5% |

Weights remain fully configurable per investigation type (financial crime vs. organized crime vs. narcotics may weight these very differently).

### Important
The score is an **analytical prioritization indicator, not proof of criminal activity**. Criminal history contributes as a *contextual factor*, never as an automatic guilt signal — a prior conviction raises review priority, it does not raise "guilt."

### Example (Updated)
```text
Priority Score: 85/100 — Person A

Contributing Factors:
+ Director of 2 organizations with overlapping registered addresses
+ 3 surveillance-observed meetings with flagged individuals
+ 1 prior conviction (FIR#2021/0456, extortion)
+ Circular fund flow through Shell Entity Pvt Ltd
+ Coordinated social media activity with 2 co-accused accounts
```

```text
Priority Score: 71/100 — Shell Entity Pvt Ltd (Organization)

Contributing Factors:
+ Shares registered address with 2 other flagged organizations
+ Circular transaction pattern with Organization Y
+ 2 directors also linked to prior criminal cases
```

---

## 11. Explainable AI (unchanged principle, now covers organizations)

Every score — person or organization — must show its contributing factors, source documents, and confidence levels, never a bare number.

---

# 🏗️ System Architecture (Updated)

```text
                         ┌─────────────────────────────────────┐
                         │              Data Sources            │
                         ├───────────────────────────────────────┤
                         │ FIRs / Police Reports                 │
                         │ Intelligence Agency Reports            │
                         │ CDRs                                   │
                         │ Bank Transactions                      │
                         │ Vehicle Data                           │
                         │ Location Data                          │
                         │ Surveillance Reports (field/CCTV/ANPR) │
                         │ Social Media Intelligence (SOCMINT)    │
                         │ Criminal History Database               │
                         │ Organization Registries                │
                         └───────────────────┬───────────────────┘
                                             │
                                             ▼
                         ┌───────────────────────────────────────┐
                         │            Data Ingestion              │
                         │  (Document path + Structured-feed path)│
                         └───────────────────┬───────────────────┘
                                             │
                          ┌──────────────────┼──────────────────┐
                          ▼                                     ▼
              ┌─────────────────────┐              ┌─────────────────────────┐
              │ OCR / Text Extraction│              │ Structured Feed Parsing │
              │ (docs, scanned logs) │              │ (CDR, txn, ANPR, SOCMINT)│
              └──────────┬───────────┘              └────────────┬────────────┘
                         ▼                                        │
              ┌─────────────────────┐                             │
              │ Language Detection  │                             │
              └──────────┬───────────┘                             │
                         ▼                                        │
              ┌─────────────────────┐                             │
              │ Translation (Sarvam)│                             │
              └──────────┬───────────┘                             │
                         └──────────────────┬─────────────────────┘
                                             ▼
                         ┌───────────────────────────────────────┐
                         │                NLP Engine               │
                         ├───────────────────────────────────────┤
                         │ NER (Person, Org, Location, Vehicle...) │
                         │ Entity Resolution (incl. criminal hist.)│
                         │ Event Extraction                        │
                         │ Relationship Extraction (incl. org↔org) │
                         └───────────────────┬───────────────────┘
                                             ▼
                         ┌───────────────────────────────────────┐
                         │            Knowledge Graph (Neo4j)      │
                         └───────────────────┬───────────────────┘
                                             │
             ┌────────────────┬─────────────┼─────────────┬────────────────┐
             ▼                ▼             ▼             ▼                ▼
     ┌──────────────┐ ┌──────────────┐┌───────────┐┌──────────────┐┌───────────────┐
     │Graph Analytics│ │Anomaly Engine││ Timeline  ││ Org Analytics││ Criminal-Hist. │
     │(Person)       │ │(all sources) ││           ││ (Section 7A) ││ Linkage Engine │
     └───────┬───────┘ └──────┬───────┘└─────┬──────┘└──────┬───────┘└────────┬───────┘
             └────────────────┴──────────────┴──────────────┴────────────────┘
                                             ▼
                         ┌───────────────────────────────────────┐
                         │           Priority Score Engine          │
                         │        (Person scores + Org scores)      │
                         └───────────────────┬───────────────────┘
                                             ▼
                         ┌───────────────────────────────────────┐
                         │          Investigation Dashboard         │
                         └───────────────────────────────────────┘
```

---

# 🧩 Main System Modules (Updated / New Modules Marked)

## Module 1 — Data Ingestion
Now branches into **Document Path** (OCR + translation) and **Structured Feed Path** (CDR, transactions, ANPR, SOCMINT exports), converging into shared validation and normalization.

## Module 2 — Document Intelligence
Unchanged, now also processes intelligence agency reports and surveillance report documents.

## Module 3 — NLP Engine
Now includes **Organization NER** as a tuned entity class (distinguishing companies, NGOs, shell entities) rather than treating it as a generic label.

## Module 4 — Entity Resolution
Now also resolves:
* **Criminal history records** to existing Person nodes (matching on name, ID number, prior case linkage)
* **Social media accounts** to real-world identities, with explicit confidence scoring (SOCMINT identity resolution is inherently uncertain and must never be auto-confirmed)

## Module 5 — Knowledge Graph
Schema extended with `CriminalHistoryRecord`, `SurveillanceObservation`, `SocialMediaAccount` nodes and the relationship types listed in Section 5/6.

## Module 6 — Graph Analytics
Split into **Person Analytics** and **Organization Analytics (new)** — see Section 7A.

## Module 7 — Anomaly Detection
Adds **Surveillance Anomaly** and **Social Media Anomaly** sub-engines alongside existing communication/financial/movement detectors.

## Module 8 — Scoring Engine
Weighting model updated per Section 10; now produces both **Person Priority Scores** and **Organization Priority Scores**.

## Module 9 — Investigation Dashboard
New dashboard widgets: **Organization Network Panel**, **Criminal History Panel**, **Surveillance Timeline Overlay**, **Social Media Signal Feed**.

### Updated Dashboard Layout

```text
┌───────────────────────────────────────────────────────────────┐
│                        CASE OVERVIEW                          │
├────────┬────────┬────────┬────────┬────────┬─────────┬───────┤
│ Persons│  Orgs  │ Phones │Accounts│Vehicles│Surveil. │Social │
└────────┴────────┴────────┴────────┴────────┴─────────┴───────┘

┌───────────────────────────────────────────────────────────────┐
│                    NETWORK GRAPH                              │
│        A ───── B ───── OrgX                                   │
│        │       │        │                                     │
│        D ───── E       OrgY                                   │
└───────────────────────────────────────────────────────────────┘

┌───────────────────┬───────────────────┬───────────────────────┐
│ Timeline           │ Criminal History  │ AI Insights           │
│ Calls / Txns /      │ Prior FIRs        │ Key Person / Org      │
│ Movements /         │ Convictions       │ Suspicious Transfer   │
│ Surveillance /      │ Co-accused links  │ Shell-Org Cluster     │
│ Social activity     │                   │ Social Coordination   │
└───────────────────┴───────────────────┴───────────────────────┘
```

---

# 🗄️ Data Model (New & Updated Entities)

## Organization *(elevated)*
```text
Organization
 ├── org_id
 ├── name
 ├── registration_number
 ├── registered_address
 ├── directors[]
 ├── shareholders[]
 ├── linked_accounts[]
 └── metadata
```

## CriminalHistoryRecord *(new)*
```text
CriminalHistoryRecord
 ├── record_id
 ├── person_id
 ├── prior_fir_number
 ├── offense_type
 ├── case_outcome
 ├── co_accused[]
 └── source_reference
```

## SurveillanceObservation *(new)*
```text
SurveillanceObservation
 ├── observation_id
 ├── observed_entities[]
 ├── method (field / CCTV / ANPR)
 ├── location_id
 ├── timestamp
 ├── reporting_officer
 └── confidence
```

## SocialMediaAccount *(new)*
```text
SocialMediaAccount
 ├── account_id
 ├── platform
 ├── handle
 ├── linked_person_id (nullable, confidence-scored)
 ├── flagged_content[]
 └── geotags[]
```

(Person, Phone, Vehicle, BankAccount, Transaction, Location, Case entities remain as previously defined.)

---

# 🔗 Example Graph Schema (Updated)

```text
(Person)
    │
    ├── CALLS ──────────────────→ (Person)
    ├── USES ───────────────────→ (Phone)
    ├── OWNS ───────────────────→ (Vehicle)
    ├── OWNS/USES ──────────────→ (BankAccount)
    ├── VISITED ────────────────→ (Location)
    ├── MENTIONED_IN ───────────→ (FIR)
    ├── DIRECTOR_OF ────────────→ (Organization)
    ├── HAS_PRIOR_CASE ─────────→ (CriminalHistoryRecord)
    ├── OBSERVED_WITH ──────────→ (Person)         [via SurveillanceObservation]
    └── LINKED_TO ──────────────→ (SocialMediaAccount)

(Organization)
    ├── TRANSACTS_WITH ─────────→ (Organization)
    ├── REGISTERED_AT_SAME_ADDRESS → (Organization)
    └── EMPLOYEE_OF ← (Person)
```

---

# 🛠️ Technology Stack (Additions Marked)

## Frontend
* React.js, Next.js, TypeScript, Tailwind CSS, Cytoscape.js / D3.js
* **New:** Timeline-overlay component for surveillance/social correlation

## Backend
* Python, FastAPI, REST APIs
* **New:** Ingestion adapters for CDR providers, ANPR feeds, and lawful SOCMINT export formats

## AI / NLP
* Transformer-based NLP, NER (now tuned for Organization class), Entity Resolution, Anomaly Detection
* **New:** Identity-resolution confidence model for social-media-to-person linkage

## Translation
* Sarvam API

## OCR
* Tesseract OCR (extended to surveillance/intel report scans)

## Databases
* **Neo4j** — entities, relationships, network traversal, now including Organization-level analytics
* **PostgreSQL** — user management, case metadata, audit logs, **criminal history records**, configuration

## Analytics
* NetworkX, Python, statistical analysis, machine learning
* **New:** Organization-community detection module (shared-director / shared-address clustering)

---

# 📁 Updated Project Structure

```text
criminal-network-analysis/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── graph/
│   ├── dashboard/
│   └── services/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── main.py
│
├── ai/
│   ├── ocr/
│   ├── translation/
│   ├── ner/                     (Organization class added)
│   ├── entity_resolution/       (+ criminal history & SOCMINT linkage)
│   ├── relationship_extraction/ (+ org↔org, org↔person)
│   ├── anomaly_detection/       (+ surveillance, social sub-modules)
│   └── scoring/                 (+ org scoring, criminal history weight)
│
├── ingestion/                    ← NEW
│   ├── documents/                (FIR, intel reports, surveillance docs)
│   └── structured_feeds/         (CDR, transactions, ANPR, SOCMINT)
│
├── graph/
│   ├── schema/                   (+ new node/edge types)
│   ├── queries/
│   └── analytics/
│       ├── person_analytics/
│       └── organization_analytics/   ← NEW
│
├── data/
│   ├── sample/
│   └── schemas/
│
├── tests/
├── docs/
├── .env.example
├── requirements.txt
├── docker-compose.yml
└── README.md
```

---

# 🔐 Security & Privacy (Extra Emphasis for New Sources)

The new data sources carry meaningfully higher privacy risk, so the following controls are **mandatory, not optional**, before Phase 2 features go live:

* **SOCMINT**: Only lawfully obtained, authorized-scope data; no open scraping of private accounts; explicit purpose logging per query.
* **Surveillance data**: Chain-of-custody metadata preserved (reporting officer, method, authorization reference) for every observation.
* **Criminal history**: Access restricted by role (see RBAC below); display always paired with case status (charged / convicted / acquitted) to avoid misrepresenting unproven allegations as fact.
* **Organization registry data**: Cross-referencing with public registries is fine; inference of "front" relationships must always show as low-confidence, human-reviewable, never auto-asserted.

## Role-Based Access Control (Updated)
```text
Admin
   ↓
Senior Investigator   — full access incl. criminal history & SOCMINT linkage results
   ↓
Investigator          — case-scoped access, criminal history visible, SOCMINT linkage visible with confidence flags
   ↓
Analyst               — graph/analytics access, no direct criminal-history record view (aggregated risk score only)
```

## Audit Logs
All access to criminal history, surveillance, and SOCMINT-linked records is logged with the same fields as before (user, action, timestamp, case, record), given their higher sensitivity.

## Data Minimization
SOCMINT and surveillance ingestion should default to **case-scoped, time-bounded collection** — not a standing feed — unless specifically authorized otherwise.

---

# ⚖️ Responsible AI (Reinforced)

Two new principles given the added sources:

1. **Criminal history informs priority, not guilt.** A prior case (even a conviction) is a contextual weight in the scoring model, always shown with its outcome — it must never be presented as evidence for the *current* investigation.
2. **Social-media and surveillance links carry confidence scores, always.** Identity resolution for a social media handle, or a person identified in a CCTV frame, is probabilistic. The UI must show confidence (e.g., "72% match") and never silently upgrade a probable match to a confirmed identity.

```text
Observed Data → Extracted Information → Analytical Inference → Investigation Lead
```

---

# 🧪 Prototype / Hackathon MVP (Updated Phasing)

### Phase 1
* FIR + Intelligence Report upload
* OCR, multilingual → English translation
* Entity extraction (Person, Organization, Location, Phone, Vehicle)
* Basic relationship extraction

### Phase 2 *(surveillance & SOCMINT moved up from "future" to here)*
* Neo4j knowledge graph
* Interactive graph visualization
* **Surveillance report ingestion** (structured log format)
* **Social media intelligence ingestion** (structured export format, confidence-scored linkage)
* **Criminal history database integration**
* Person/phone/account/**organization** search
* Filtering

### Phase 3
* Centrality & community detection — **Person AND Organization**
* Suspicious transaction detection
* Communication anomaly detection
* **Surveillance-derived and social-media anomaly detection**

### Phase 4
* Explainable priority scoring — **Person and Organization scores**
* Timeline analysis across all source types
* Cross-case analysis
* Investigation report generation

---

# 📌 Important Principle

> **The system identifies relationships and investigative leads across people, organizations, locations, and events; investigators make the final decisions.**

All AI-generated insights — including those derived from surveillance, social media, and criminal history — must be accompanied by source references, confidence indicators, and explanations.

