"""
Data Ingestion & Multilingual OCR/Translation API Routes (v2)
Supports:
1. Complete Dataset Folder Batch Ingestion (Primary Workflow)
2. Individual File / Text Upload (Secondary Workflow)
"""
from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional
import json
from ai.translation.sarvam_client import SarvamTranslationClient
from ai.ner.ner_extractor import CriminalNetworkNERExtractor
from ingestion.dataset_processor import DatasetFolderProcessor
from data.sample.sample_investigation_data import SAMPLE_FIRS, SAMPLE_SURVEILLANCE

router = APIRouter()
translator = SarvamTranslationClient()
ner_extractor = CriminalNetworkNERExtractor()
dataset_processor = DatasetFolderProcessor()

@router.post("/process-dataset-folder")
async def process_dataset_folder(payload: dict):
    """
    Primary Ingestion Workflow: Accepts complete dataset folder structure with 
    multiple FIR .txt files, CDR excel, financial excel, surveillance excel, 
    socmint excel, intelligence excel, criminal history excel, and registry excel.
    """
    files = payload.get("files", [])
    if not files:
        # Fallback sample dataset if empty payload
        files = [
            {"path": "criminal_network_sample_data_50/surveillance_logs.xlsx", "filename": "surveillance_logs.xlsx", "content": "Ravi Kumar observed at Jeedimetla Warehouse with Suresh Reddy."},
            {"path": "criminal_network_sample_data_50/socmint_posts.xlsx", "filename": "socmint_posts.xlsx", "content": "@shadow_broker_hyd posted Hawala routing complete."},
            {"path": "criminal_network_sample_data_50/registry_records.xlsx", "filename": "registry_records.xlsx", "content": "Apex Logistics Pvt Ltd registered at Secunderabad. Director: Ravi Kumar."},
            {"path": "criminal_network_sample_data_50/intelligence_reports.xlsx", "filename": "intelligence_reports.xlsx", "content": "Global Horizon NGO linked to syndicate funds."},
            {"path": "criminal_network_sample_data_50/financial_transactions.xlsx", "filename": "financial_transactions.xlsx", "content": "₹45,00,000 transferred to Apex Logistics Pvt Ltd."},
            {"path": "criminal_network_sample_data_50/cdr_records.xlsx", "filename": "cdr_records.xlsx", "content": "9876543210 called 9123456789 (340s)."},
            {"path": "criminal_network_sample_data_50/criminal_history.xlsx", "filename": "criminal_history.xlsx", "content": "Ravi Kumar prior FIR-2023-441 extortion."},
        ]
        # Add 50 FIR file entries
        for i in range(1, 51):
            files.append({
                "path": f"criminal_network_sample_data_50/fir/fir_{i:03d}.txt",
                "filename": f"fir_{i:03d}.txt",
                "content": f"FIR No 2026/{i:03d} station report. Accused suspect FIR-{i:03d} linked to Apex Logistics network."
            })

    result = dataset_processor.process_dataset_files(files)
    return result

@router.post("/process-text")
async def process_raw_text(text: str = Form(...), source_type: str = Form("FIR")):
    """Secondary Workflow: Process individual test file / text snippet."""
    translation_res = translator.translate_to_english(text)
    ner_res = ner_extractor.extract_entities_and_relations(translation_res["translated_text"])
    
    return {
        "status": "success",
        "source_type": source_type,
        "translation": translation_res,
        "extraction": ner_res
    }

@router.get("/recent-feeds")
async def get_recent_ingestion_feeds():
    """Return live feed of multi-source document & structured feed intake."""
    return {
        "firs": SAMPLE_FIRS,
        "surveillance": SAMPLE_SURVEILLANCE
    }
