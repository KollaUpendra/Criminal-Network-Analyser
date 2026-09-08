"""
Analytics & Risk Scoring API Routes
"""
from fastapi import APIRouter
from graph.analytics.graph_engine import CriminalNetworkGraphEngine

router = APIRouter()
graph_engine = CriminalNetworkGraphEngine()

@router.get("/risk-scores")
async def get_risk_scores():
    """Return calculated weighted risk/priority scores for all entities."""
    scores = graph_engine.compute_risk_scores()
    return {"high_priority_targets": scores, "total": len(scores)}

@router.get("/anomalies")
async def get_detected_anomalies():
    """Return categorized suspicious pattern anomalies."""
    return {
        "anomalies": [
            {
                "id": "ANOM-01",
                "category": "Organizational & Financial",
                "title": "Circular Fund Transfer & Shell Company Clustering",
                "entities": ["Apex Logistics Pvt Ltd", "Shell Entity Pvt Ltd", "Ravi Kumar"],
                "description": "₹42,00,000 circular fund flow detected between shared-address shell entities within 48 hours.",
                "severity": "CRITICAL"
            },
            {
                "id": "ANOM-02",
                "category": "Surveillance & CDR Correlation",
                "title": "Pre-Transaction Meeting Overlap",
                "entities": ["Ravi Kumar", "Suresh Reddy", "TS09AB1234"],
                "description": "Tower dump CDR overlap matched CCTV sighting at Jeedimetla Warehouse at 21:35 PM.",
                "severity": "HIGH"
            },
            {
                "id": "ANOM-03",
                "category": "Criminal History Weighting",
                "title": "Prior NDPS Convict Associated with Shell Org",
                "entities": ["Suresh Reddy", "Global Horizon NGO"],
                "description": "Suresh Reddy (NDPS Convict, FIR-2021-089) listed as Director in newly registered NGO.",
                "severity": "HIGH"
            }
        ]
    }
