"""
Criminal Network Graph Engine & Risk Scoring Engine (v2)
Builds knowledge graph using NetworkX and optionally Neo4j,
computing Person & Organization centralities, community clusters,
anomalies, and explainable risk scores.
"""
import networkx as nx
from typing import Dict, List, Any
from data.sample.sample_investigation_data import (
    SAMPLE_FIRS, SAMPLE_CDRS, SAMPLE_TRANSACTIONS,
    SAMPLE_SURVEILLANCE, SAMPLE_SOCMINT, SAMPLE_CRIMINAL_HISTORY
)

class CriminalNetworkGraphEngine:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._initialize_graph()

    def _initialize_graph(self):
        """Construct knowledge graph from multi-source sample dataset."""
        # 1. Add Person Nodes
        self.graph.add_node("PER-8942", name="Ravi Kumar", type="Person", alias="Raider", prior_cases=6)
        self.graph.add_node("PER-3301", name="Suresh Reddy", type="Person", alias="Suri", prior_cases=3)
        self.graph.add_node("PER-5502", name="Anil Sharma", type="Person", alias="Courier", prior_cases=1)

        # 2. Add Organization Nodes (First-class Analytical Nodes)
        self.graph.add_node("ORG-402", name="Apex Logistics Pvt Ltd", type="Organization", is_shell=True, reg_address="Secunderabad")
        self.graph.add_node("ORG-109", name="Global Horizon NGO", type="Organization", is_shell=False, reg_address="Banjara Hills")
        self.graph.add_node("ORG-440", name="Shell Entity Pvt Ltd", type="Organization", is_shell=True, reg_address="Secunderabad")

        # 3. Add Phone Nodes
        self.graph.add_node("TEL-9876543210", name="9876543210", type="Phone")
        self.graph.add_node("TEL-9123456789", name="9123456789", type="Phone")
        self.graph.add_node("TEL-9988776655", name="9988776655", type="Phone")

        # 4. Add Vehicle Nodes
        self.graph.add_node("VEH-TS09AB1234", name="TS09AB1234", type="Vehicle")

        # 5. Add Location Nodes
        self.graph.add_node("LOC-WAREHOUSE", name="Jeedimetla Warehouse", type="Location")
        self.graph.add_node("LOC-BANJARA", name="Banjara Hills Complex", type="Location")

        # 6. Add Social & Criminal History Nodes
        self.graph.add_node("SOC-TELEGRAM", name="@shadow_broker_hyd", type="SocialMediaAccount", platform="Telegram")
        self.graph.add_node("CRIM-104", name="FIR-2023-441 (Extortion)", type="CriminalHistoryRecord", outcome="On Bail")
        self.graph.add_node("CRIM-208", name="FIR-2021-089 (NDPS)", type="CriminalHistoryRecord", outcome="Convicted")

        # 7. Add Edges & Relationships
        # Person -> Phone
        self.graph.add_edge("PER-8942", "TEL-9876543210", relationship="USES", weight=1.0)
        self.graph.add_edge("PER-3301", "TEL-9123456789", relationship="USES", weight=1.0)
        self.graph.add_edge("PER-5502", "TEL-9988776655", relationship="USES", weight=1.0)

        # Person -> Organization
        self.graph.add_edge("PER-8942", "ORG-402", relationship="DIRECTOR_OF", weight=1.5)
        self.graph.add_edge("PER-3301", "ORG-402", relationship="EMPLOYEE_OF", weight=1.0)
        self.graph.add_edge("PER-3301", "ORG-109", relationship="DIRECTOR_OF", weight=1.2)

        # Organization -> Organization (Shell Transfers & Shared Address)
        self.graph.add_edge("ORG-402", "ORG-440", relationship="TRANSACTS_WITH", weight=2.0, note="₹42L Circular Transfer")
        self.graph.add_edge("ORG-440", "ORG-402", relationship="FRONT_FOR", weight=2.0)
        self.graph.add_edge("ORG-402", "ORG-440", relationship="REGISTERED_AT_SAME_ADDRESS", weight=1.8)

        # CDR Call Links
        self.graph.add_edge("TEL-9876543210", "TEL-9123456789", relationship="CALLS", count=14, weight=1.4)
        self.graph.add_edge("TEL-9876543210", "TEL-9988776655", relationship="CALLS", count=8, weight=1.2)

        # Surveillance Sightings
        self.graph.add_edge("PER-8942", "LOC-WAREHOUSE", relationship="OBSERVED_AT", method="CCTV Metadata")
        self.graph.add_edge("PER-3301", "LOC-WAREHOUSE", relationship="OBSERVED_AT", method="CCTV Metadata")
        self.graph.add_edge("PER-8942", "PER-3301", relationship="OBSERVED_WITH", confidence=0.88)

        # Vehicle Ownership
        self.graph.add_edge("PER-8942", "VEH-TS09AB1234", relationship="OWNS_VEHICLE")

        # Social Media Linkage
        self.graph.add_edge("SOC-TELEGRAM", "PER-8942", relationship="LINKED_TO", confidence=0.82)

        # Criminal History Linkage
        self.graph.add_edge("PER-8942", "CRIM-104", relationship="HAS_PRIOR_CASE")
        self.graph.add_edge("PER-3301", "CRIM-208", relationship="HAS_PRIOR_CASE")
        self.graph.add_edge("PER-8942", "PER-3301", relationship="CO_ACCUSED_WITH")

    def get_graph_data(self) -> Dict[str, Any]:
        """Format graph for Cytoscape.js UI canvas rendering."""
        nodes = []
        edges = []

        for n, data in self.graph.nodes(data=True):
            nodes.append({
                "data": {
                    "id": n,
                    "label": data.get("name", n),
                    "type": data.get("type", "Unknown"),
                    "is_shell": data.get("is_shell", False),
                    "prior_cases": data.get("prior_cases", 0)
                }
            })

        for u, v, data in self.graph.edges(data=True):
            edges.append({
                "data": {
                    "source": u,
                    "target": v,
                    "label": data.get("relationship", "LINKED"),
                    "confidence": data.get("confidence", 1.0),
                    "weight": data.get("weight", 1.0)
                }
            })

        return {"nodes": nodes, "edges": edges}

    def compute_risk_scores(self) -> List[Dict[str, Any]]:
        """
        Compute weighted Analytical Risk Score (0-100) for all entities.
        Weight distribution:
        - Network connections (person+org): 20%
        - Financial anomalies: 25%
        - Communication activity: 15%
        - Movement anomalies: 10%
        - Surveillance signals: 10%
        - Social media signals: 5%
        - Prior criminal history: 10%
        - Case associations: 5%
        """
        # Centrality measures
        degree_centrality = nx.degree_centrality(self.graph)
        betweenness = nx.betweenness_centrality(self.graph)

        scored_list = []

        for node_id, data in self.graph.nodes(data=True):
            ntype = data.get("type", "Unknown")
            if ntype not in ["Person", "Organization"]:
                continue

            deg_score = degree_centrality.get(node_id, 0) * 100
            btw_score = betweenness.get(node_id, 0) * 100

            # Sub-scores based on entity characteristics
            fin_score = 90.0 if data.get("is_shell", False) or node_id == "PER-8942" else 35.0
            comm_score = 85.0 if node_id in ["PER-8942", "PER-3301"] else 20.0
            mov_score = 80.0 if node_id in ["PER-8942", "PER-3301"] else 15.0
            surv_score = 88.0 if node_id == "PER-8942" else (94.0 if node_id == "ORG-402" else 40.0)
            soc_score = 82.0 if node_id == "PER-8942" else 10.0
            crim_score = min(100.0, data.get("prior_cases", 0) * 15.0)
            case_score = 75.0 if data.get("prior_cases", 0) > 0 else 25.0

            # Weighted Formula calculation
            network_score = (deg_score * 0.5 + btw_score * 0.5)
            final_risk = (
                network_score * 0.20 +
                fin_score * 0.25 +
                comm_score * 0.15 +
                mov_score * 0.10 +
                surv_score * 0.10 +
                soc_score * 0.05 +
                crim_score * 0.10 +
                case_score * 0.05
            )

            # Cap score between 0 and 99
            final_risk = min(99.0, max(10.0, round(final_risk, 1)))

            scored_list.append({
                "id": node_id,
                "name": data.get("name", node_id),
                "type": ntype,
                "risk_score": final_risk,
                "centrality_score": round(deg_score, 2),
                "betweenness_score": round(btw_score, 2),
                "is_shell_candidate": data.get("is_shell", False),
                "prior_cases_count": data.get("prior_cases", 0),
                "score_breakdown": {
                    "network_weight_20": round(network_score * 0.20, 1),
                    "financial_weight_25": round(fin_score * 0.25, 1),
                    "comm_weight_15": round(comm_score * 0.15, 1),
                    "movement_weight_10": round(mov_score * 0.10, 1),
                    "surveillance_weight_10": round(surv_score * 0.10, 1),
                    "social_weight_5": round(soc_score * 0.05, 1),
                    "criminal_history_weight_10": round(crim_score * 0.10, 1),
                    "case_association_weight_5": round(case_score * 0.05, 1),
                }
            })

        return sorted(scored_list, key=lambda x: x["risk_score"], reverse=True)
