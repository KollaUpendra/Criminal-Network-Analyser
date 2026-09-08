"""
Priority Scoring Weight Configuration
Configurable per investigation type: financial crime, organized crime, narcotics.
"""
from pydantic import BaseModel


class ScoringWeights(BaseModel):
    """Scoring weights must sum to 1.0."""
    network_connections: float = 0.20     # Person + org connections
    financial_anomalies: float = 0.25     # Suspicious transactions, circular flows
    communication_activity: float = 0.15  # Call patterns, burst activity
    movement_anomalies: float = 0.10      # Location/movement patterns
    surveillance_signals: float = 0.10    # Field surveillance, CCTV, ANPR
    social_media_signals: float = 0.05    # SOCMINT signals
    prior_criminal_history: float = 0.10  # Prior FIRs, convictions
    case_associations: float = 0.05       # Association with active cases


# ── Preset weight profiles ────────────────────────────────────

FINANCIAL_CRIME_WEIGHTS = ScoringWeights(
    network_connections=0.15,
    financial_anomalies=0.40,
    communication_activity=0.10,
    movement_anomalies=0.05,
    surveillance_signals=0.05,
    social_media_signals=0.05,
    prior_criminal_history=0.10,
    case_associations=0.10,
)

ORGANIZED_CRIME_WEIGHTS = ScoringWeights(
    network_connections=0.25,
    financial_anomalies=0.20,
    communication_activity=0.20,
    movement_anomalies=0.10,
    surveillance_signals=0.10,
    social_media_signals=0.05,
    prior_criminal_history=0.05,
    case_associations=0.05,
)

NARCOTICS_WEIGHTS = ScoringWeights(
    network_connections=0.20,
    financial_anomalies=0.20,
    communication_activity=0.15,
    movement_anomalies=0.20,
    surveillance_signals=0.10,
    social_media_signals=0.05,
    prior_criminal_history=0.05,
    case_associations=0.05,
)

DEFAULT_WEIGHTS = ScoringWeights()  # As per README spec

WEIGHT_PROFILES = {
    "default": DEFAULT_WEIGHTS,
    "financial_crime": FINANCIAL_CRIME_WEIGHTS,
    "organized_crime": ORGANIZED_CRIME_WEIGHTS,
    "narcotics": NARCOTICS_WEIGHTS,
}
