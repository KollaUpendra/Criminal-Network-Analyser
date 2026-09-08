"""
Neo4j Graph Schema — Node type definitions
All node labels for the Criminal Network Knowledge Graph.
"""

// ── Person ──────────────────────────────────────────────────
CREATE CONSTRAINT person_id IF NOT EXISTS
FOR (p:Person) REQUIRE p.person_id IS UNIQUE;

// ── Organization ─────────────────────────────────────────────
CREATE CONSTRAINT org_id IF NOT EXISTS
FOR (o:Organization) REQUIRE o.org_id IS UNIQUE;

// ── Phone ────────────────────────────────────────────────────
CREATE CONSTRAINT phone_number IF NOT EXISTS
FOR (ph:Phone) REQUIRE ph.number IS UNIQUE;

// ── Vehicle ──────────────────────────────────────────────────
CREATE CONSTRAINT vehicle_reg IF NOT EXISTS
FOR (v:Vehicle) REQUIRE v.registration_number IS UNIQUE;

// ── BankAccount ──────────────────────────────────────────────
CREATE CONSTRAINT bank_account_id IF NOT EXISTS
FOR (b:BankAccount) REQUIRE b.account_id IS UNIQUE;

// ── Location ─────────────────────────────────────────────────
CREATE CONSTRAINT location_id IF NOT EXISTS
FOR (l:Location) REQUIRE l.location_id IS UNIQUE;

// ── Case / FIR ───────────────────────────────────────────────
CREATE CONSTRAINT case_id IF NOT EXISTS
FOR (c:Case) REQUIRE c.case_id IS UNIQUE;

// ── Event ────────────────────────────────────────────────────
CREATE CONSTRAINT event_id IF NOT EXISTS
FOR (e:Event) REQUIRE e.event_id IS UNIQUE;

// ── CriminalHistoryRecord (NEW) ──────────────────────────────
CREATE CONSTRAINT criminal_history_id IF NOT EXISTS
FOR (chr:CriminalHistoryRecord) REQUIRE chr.record_id IS UNIQUE;

// ── SurveillanceObservation (NEW) ────────────────────────────
CREATE CONSTRAINT surveillance_obs_id IF NOT EXISTS
FOR (so:SurveillanceObservation) REQUIRE so.observation_id IS UNIQUE;

// ── SocialMediaAccount (NEW) ─────────────────────────────────
CREATE CONSTRAINT social_account_id IF NOT EXISTS
FOR (sma:SocialMediaAccount) REQUIRE sma.account_id IS UNIQUE;
