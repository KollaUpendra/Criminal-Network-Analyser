"""
Sample Investigation Dataset Generator for Criminal Network Analyser (v2)
Includes FIRs (Telugu, Hindi, English), CDR logs, Bank Transfers,
Surveillance Observations, Social Media Intelligence, and Criminal History Records.
"""

SAMPLE_FIRS = [
    {
        "fir_id": "FIR-2026-904",
        "station": "Cyber Crime PS, Hyderabad",
        "language": "Telugu",
        "original_text": "అనుమానాస్పద ఖాతా నుండి ₹45,00,000 షెల్ కంపెనీ 'Apex Logistics Pvt Ltd' కు బదిలీ చేయబడింది. నిందితుడు రవి కుమార్ (రైడర్) మరియు సురేష్ రెడ్డి ద్వారా నిధులు హవాలా మార్గంలో పంపబడ్డాయి.",
        "translated_text": "₹45,00,000 transferred from suspicious account to shell company 'Apex Logistics Pvt Ltd'. Suspect Ravi Kumar (alias Raider) and Suresh Reddy routed funds via hawala channels.",
        "source_type": "FIR",
        "date": "2026-08-10"
    },
    {
        "fir_id": "FIR-2026-112",
        "station": "Special Cell, Delhi",
        "language": "Hindi",
        "original_text": "गुप्त सूचना के आधार पर 'Global Horizon NGO' के पते पर छापा मारा गया। वहां से 5 बेनामी बैंक पासबुक और फर्जी दस्तावेज बरामद हुए। संगठन का संबंध गिरोह सरगना रवि कुमार से पाया गया।",
        "translated_text": "Based on intelligence, raid conducted at address of 'Global Horizon NGO'. 5 benami bank passbooks and fake documents recovered. Organization linked to gang leader Ravi Kumar.",
        "source_type": "FIR",
        "date": "2026-08-18"
    }
]

SAMPLE_CDRS = [
    {"caller": "9876543210", "receiver": "9123456789", "timestamp": "2026-08-14 21:15:00", "duration_sec": 340, "location": "Warehouse Rd, Hyderabad"},
    {"caller": "9876543210", "receiver": "9988776655", "timestamp": "2026-08-14 21:45:00", "duration_sec": 120, "location": "Secunderabad Tower"},
    {"caller": "9123456789", "receiver": "9440011223", "timestamp": "2026-08-15 02:10:00", "duration_sec": 480, "location": "Banjara Hills, HYD"},
    {"caller": "9988776655", "receiver": "9876543210", "timestamp": "2026-08-15 03:00:00", "duration_sec": 95, "location": "Warehouse Rd, Hyderabad"}
]

SAMPLE_TRANSACTIONS = [
    {"tx_id": "TX-9011", "from_account": "ACC-8801 (Ravi Kumar)", "to_account": "ACC-9902 (Apex Logistics Pvt Ltd)", "amount": 4500000, "timestamp": "2026-08-10 14:30:00", "flagged": True},
    {"tx_id": "TX-9012", "from_account": "ACC-9902 (Apex Logistics Pvt Ltd)", "to_account": "ACC-4401 (Shell Entity Pvt Ltd)", "amount": 4200000, "timestamp": "2026-08-11 10:15:00", "flagged": True},
    {"tx_id": "TX-9013", "from_account": "ACC-4401 (Shell Entity Pvt Ltd)", "to_account": "ACC-8801 (Ravi Kumar)", "amount": 4000000, "timestamp": "2026-08-12 16:00:00", "flagged": True, "note": "Circular Transaction Pattern"}
]

SAMPLE_SURVEILLANCE = [
    {
        "observation_id": "SURV-2026-04",
        "observed_entities": ["Ravi Kumar", "Suresh Reddy", "TS09AB1234"],
        "method": "CCTV Metadata",
        "location": "Abandon Warehouse, Jeedimetla, HYD",
        "timestamp": "2026-08-14 21:35:00",
        "reporting_officer": "SI V. Sharma",
        "confidence": 0.88
    },
    {
        "observation_id": "SURV-2026-09",
        "observed_entities": ["Suresh Reddy", "Global Horizon NGO"],
        "method": "Field Surveillance",
        "location": "Banjara Hills Office Complex",
        "timestamp": "2026-08-18 11:20:00",
        "reporting_officer": "Insp. K. Rao",
        "confidence": 0.94
    }
]

SAMPLE_SOCMINT = [
    {
        "account_id": "SOC-Telegram-99",
        "platform": "Telegram",
        "handle": "@shadow_broker_hyd",
        "linked_person": "Ravi Kumar",
        "confidence": 0.82,
        "geotags": ["17.3850 N, 78.4867 E"],
        "content_snippet": "Hawala routing completed for Apex Logistics. Meet at Jeedimetla."
    }
]

SAMPLE_CRIMINAL_HISTORY = [
    {
        "record_id": "CRIM-HIST-104",
        "person_name": "Ravi Kumar",
        "prior_fir_number": "FIR-2023-441",
        "offense_type": "Extortion & Money Laundering",
        "case_outcome": "Charged / On Bail",
        "co_accused": ["Suresh Reddy"],
        "severity_weight": 0.85
    },
    {
        "record_id": "CRIM-HIST-208",
        "person_name": "Suresh Reddy",
        "prior_fir_number": "FIR-2021-089",
        "offense_type": "NDPS Act Violation",
        "case_outcome": "Convicted",
        "co_accused": [],
        "severity_weight": 0.90
    }
]
