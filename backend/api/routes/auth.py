"""
Authentication & RBAC API Routes
"""
from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
async def login():
    return {
        "access_token": "mock-jwt-token",
        "user": {
            "username": "investigator_ramana",
            "role": "Senior Investigator",
            "access_level": "Full RBAC (Criminal History & SOCMINT Unrestricted)"
        }
    }
