"""
Criminal Network Analyser — FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import auth, cases, entities, ingestion, graph, analytics

app = FastAPI(
    title="Criminal Network Analyser API",
    description="AI-powered criminal network analysis and investigation system.",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ── CORS ─────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────
app.include_router(auth.router,       prefix="/api/auth",      tags=["Auth"])
app.include_router(cases.router,      prefix="/api/cases",     tags=["Cases"])
app.include_router(entities.router,   prefix="/api/entities",  tags=["Entities"])
app.include_router(ingestion.router,  prefix="/api/ingest",    tags=["Ingestion"])
app.include_router(graph.router,      prefix="/api/graph",     tags=["Graph"])
app.include_router(analytics.router,  prefix="/api/analytics", tags=["Analytics"])


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "version": "2.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
