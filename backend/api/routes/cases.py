"""
Case Management API Routes
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_cases():
    return {
        "cases": [
            {
                "case_id": "CASE-2026-HYD-04",
                "title": "Operation Hawala Shield & Shell Org Syndicate",
                "status": "Active Investigation",
                "lead_investigator": "DSP V. Ramana",
                "firs_count": 4,
                "orgs_count": 3,
                "persons_count": 8
            }
        ]
    }
