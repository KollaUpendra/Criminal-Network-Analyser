"""
Entities Deep-Dive API Routes
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/{entity_id}")
async def get_entity_profile(entity_id: str):
    return {
        "id": entity_id,
        "name": "Ravi Kumar (Alias: Raider)",
        "type": "Person",
        "risk_score": 89.0,
        "linked_organizations": ["Apex Logistics Pvt Ltd", "Shell Entity Pvt Ltd"],
        "criminal_history": ["FIR-2023-441 (Extortion - On Bail)"],
        "surveillance_observations": ["Observed at Jeedimetla Warehouse (CCTV 88% Match)"]
    }
