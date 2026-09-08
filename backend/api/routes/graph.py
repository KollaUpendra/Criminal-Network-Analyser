"""
Graph API Routes for Criminal Network Analysis (v2)
"""
from fastapi import APIRouter
from graph.analytics.graph_engine import CriminalNetworkGraphEngine

router = APIRouter()
graph_engine = CriminalNetworkGraphEngine()

@router.get("/elements")
async def get_graph_elements():
    """Returns network nodes and edges formatted for Cytoscape.js canvas."""
    return graph_engine.get_graph_data()

@router.get("/organizations")
async def get_organization_nodes():
    """Returns first-class Organization nodes with centrality metrics."""
    data = graph_engine.get_graph_data()
    org_nodes = [n for n in data["nodes"] if n["data"].get("type") == "Organization"]
    return {"organizations": org_nodes, "count": len(org_nodes)}
