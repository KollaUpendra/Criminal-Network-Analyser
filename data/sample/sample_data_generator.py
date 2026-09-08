"""
Sample Data Generator for Criminal Network Analysis (v2)
Generates complete fictional 8-source dataset directory structure matching exact schema:

sample_data/
├── surveillance_logs.xlsx
├── socmint_posts.xlsx
├── registry_records.xlsx
├── intelligence_reports.xlsx
├── financial_transactions.xlsx
├── cdr_records.xlsx
├── criminal_history.xlsx
├── README.txt
└── fir/
    ├── fir_001.txt ... fir_050.txt
"""

import os
import json
import csv

def generate_sample_dataset(target_dir: str):
    """Generate sample_data/ directory with all 8 exact sources and cross-dataset Arjun Reddy chain."""
    os.makedirs(target_dir, exist_ok=True)
    fir_dir = os.path.join(target_dir, "fir")
    os.makedirs(fir_dir, exist_ok=True)

    # 1. Generate 50 FIR txt files
    for i in range(1, 51):
        fir_id = f"FIR-2026-{i:03d}"
        if i == 1:
            content = """FIR Number: FIR-2026-001
Date: 2026-08-10
Police Station: Cyber Crime PS, Hyderabad
Complainant: Inspector V. Sharma
Accused: Arjun Reddy
Alias: Don / Rider
Offense: Extortion & Hawala Fraud under IPC 384, 420 & IT Act 66D
Incident Description: Accused Arjun Reddy along with co-accused Suresh Reddy transferred illicit funds into Apex Logistics Pvt Ltd. Suspect used phone 9876543210 and vehicle TS09AB1234.
Location: Banjara Hills, Hyderabad
Phone Numbers: 9876543210, 9123456789
Vehicles: TS09AB1234
Organizations: Apex Logistics Pvt Ltd, Shell Entity Pvt Ltd
Seized Items: 3 Mobile phones, 5 benami passbooks
Witnesses: K. Ramu
Co-accused: Suresh Reddy, Ravi Kumar
Investigation Notes: CDR tower dump confirms suspect presence at Jeedimetla Warehouse.
Case Status: Under Investigation"""
        else:
            victim_pool = ["K. Ramu", "P. Sunita", "V. Mahesh Rao", "R. Sharma", "T. Anand Kumar", "K. Priya Devi", "B. Rajesh Goud", "S. Lakshmi", "M. Suresh Babu", "V. Swathi", "N. Ramesh", "D. Venkatesh"]
            accused_pool = [
                ("Arjun Reddy", "Rider / Don"),
                ("Suresh Reddy", "Suri"),
                ("Ravi Kumar", "Shadow Broker"),
                ("Kishan Rao", "Tiger"),
                ("Mohan Das", "Hawala King"),
                ("Vikram Varma", "Phantom"),
                ("Pradeep Kumar", "Cobra"),
                ("Ganesh Hegde", "Boss"),
                ("Dharmendra Singh", "Pandit"),
                ("Rajesh Khanna", "Director")
            ]
            v_name = victim_pool[i % len(victim_pool)]
            a_name, a_alias = accused_pool[i % len(accused_pool)]

            content = f"""FIR Number: {fir_id}
Date: 2026-08-{10 + (i % 15):02d}
Police Station: Cyber Crime PS, Hyderabad
Complainant: SI K. Rao
Victim: {v_name}
Accused: {a_name}
Alias: {a_alias}
Offense: Money Laundering & Extortion Hawala (IPC 384, 420 & IT Act 66D)
Incident Description: Investigation into extortion network of {a_name} ({a_alias}) linked to Apex Logistics Pvt Ltd. Victim {v_name} reported loss.
Location: Jubilee Hills, Hyderabad
Phone Numbers: 9876543{i:03d}
Vehicles: TS09XY{i:04d}
Organizations: Apex Logistics Pvt Ltd, Shell Entity Pvt Ltd
Seized Items: Encrypted Laptop, Benami passbooks
Witnesses: {v_name}
Co-accused: Arjun Reddy, Suresh Reddy
Investigation Notes: Financial transfer linked to Hawala transaction account ACC-880{i}.
Case Status: Under Active Investigation"""
        
        with open(os.path.join(fir_dir, f"fir_{i:03d}.txt"), "w", encoding="utf-8") as f:
            f.write(content)

    # Helper to write CSV/Excel compatible data
    def write_csv(filename, fieldnames, rows):
        path = os.path.join(target_dir, filename)
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    # 2. Intelligence — intelligence_reports.xlsx (saved as CSV/Excel compatible)
    write_csv("intelligence_reports.xlsx", 
        ["report_id", "report_date", "analyst", "threat_level", "primary_person", "alias", "role", "linked_person", "organization", "location", "assessment"],
        [
            {
                "report_id": "INT-REP-101",
                "report_date": "2026-08-11",
                "analyst": "Analyst A. Verma",
                "threat_level": "CRITICAL",
                "primary_person": "Arjun Reddy",
                "alias": "Rider",
                "role": "Syndicate Kingpin",
                "linked_person": "Suresh Reddy",
                "organization": "Apex Logistics Pvt Ltd",
                "location": "Hyderabad",
                "assessment": "Primary handler behind circular hawala transfers into Shell Entity Pvt Ltd."
            },
            {
                "report_id": "INT-REP-102",
                "report_date": "2026-08-12",
                "analyst": "Analyst B. Patel",
                "threat_level": "HIGH",
                "primary_person": "Suresh Reddy",
                "alias": "Suri",
                "role": "Financial Courier",
                "linked_person": "Arjun Reddy",
                "organization": "Global Horizon NGO",
                "location": "Secunderabad",
                "assessment": "Routes illegal proceeds via benami NGO accounts."
            }
        ]
    )

    # 3. CDR — cdr_records.xlsx
    write_csv("cdr_records.xlsx",
        ["record_id", "date", "time", "caller", "receiver", "duration_seconds", "tower_id", "imei", "tower_location"],
        [
            {"record_id": "CDR-9001", "date": "2026-08-14", "time": "21:15:00", "caller": "9876543210", "receiver": "9123456789", "duration_seconds": 340, "tower_id": "TOW-HYD-04", "imei": "864201048899123", "tower_location": "Warehouse Rd, Jeedimetla"},
            {"record_id": "CDR-9002", "date": "2026-08-14", "time": "21:45:00", "caller": "9876543210", "receiver": "9988776655", "duration_seconds": 120, "tower_id": "TOW-HYD-04", "imei": "864201048899123", "tower_location": "Warehouse Rd, Jeedimetla"},
            {"record_id": "CDR-9003", "date": "2026-08-15", "time": "02:10:00", "caller": "9123456789", "receiver": "9440011223", "duration_seconds": 480, "tower_id": "TOW-HYD-12", "imei": "358901048899444", "tower_location": "Banjara Hills, HYD"}
        ]
    )

    # 4. Financial — financial_transactions.xlsx
    write_csv("financial_transactions.xlsx",
        ["transaction_id", "date", "sender_account", "receiver_account", "amount", "description", "linked_company"],
        [
            {"transaction_id": "TX-1001", "date": "2026-08-10", "sender_account": "ACC-8801 (Arjun Reddy)", "receiver_account": "ACC-9902 (Apex Logistics)", "amount": 4500000, "description": "Hawala routing deposit", "linked_company": "Apex Logistics Pvt Ltd"},
            {"transaction_id": "TX-1002", "date": "2026-08-11", "sender_account": "ACC-9902 (Apex Logistics)", "receiver_account": "ACC-4401 (Shell Entity)", "amount": 4200000, "description": "Inter-company transfer", "linked_company": "Shell Entity Pvt Ltd"},
            {"transaction_id": "TX-1003", "date": "2026-08-12", "sender_account": "ACC-4401 (Shell Entity)", "receiver_account": "ACC-8801 (Arjun Reddy)", "amount": 4000000, "description": "Circular transfer return", "linked_company": "Apex Logistics Pvt Ltd"}
        ]
    )

    # 5. Surveillance — surveillance_logs.xlsx
    write_csv("surveillance_logs.xlsx",
        ["event_id", "date", "time", "location", "person_1", "person_2", "vehicle", "event"],
        [
            {"event_id": "SURV-801", "date": "2026-08-14", "time": "21:35:00", "location": "Warehouse Rd, Jeedimetla", "person_1": "Arjun Reddy", "person_2": "Suresh Reddy", "vehicle": "TS09AB1234", "event": "MEETING & JOINT_MOVEMENT"},
            {"event_id": "SURV-802", "date": "2026-08-18", "time": "11:20:00", "location": "Banjara Hills Office Complex", "person_1": "Suresh Reddy", "person_2": "Unknown Operative", "vehicle": "TS09AB1234", "event": "LOCATION_VISIT"}
        ]
    )

    # 6. SOCMINT — socmint_posts.xlsx
    write_csv("socmint_posts.xlsx",
        ["post_id", "date", "handle", "platform", "text", "location", "mentioned_handle"],
        [
            {"post_id": "SOC-501", "date": "2026-08-14", "handle": "@arjun_rider", "platform": "Telegram", "text": "Hawala routing for Apex Logistics complete. Meet at Jeedimetla. #hawala #syndicate", "location": "Hyderabad", "mentioned_handle": "@shadow_broker"},
            {"post_id": "SOC-502", "date": "2026-08-15", "handle": "@shadow_broker", "platform": "Twitter", "text": "అనుమానాస్పద ఖాతా Apex Logistics బదిలీ పూర్తయింది. Call 9876543210.", "location": "Secunderabad", "mentioned_handle": "@arjun_rider"}
        ]
    )

    # 7. Criminal History — criminal_history.xlsx
    write_csv("criminal_history.xlsx",
        ["record_id", "record_date", "person_id", "name", "prior_fir", "offense", "year", "case_status", "co_accused"],
        [
            {"record_id": "CRIM-701", "record_date": "2023-05-10", "person_id": "PER-8942", "name": "Arjun Reddy", "prior_fir": "FIR-2023-441", "offense": "Extortion & Money Laundering", "year": 2023, "case_status": "Charged / On Bail", "co_accused": "Suresh Reddy"},
            {"record_id": "CRIM-702", "record_date": "2021-11-20", "person_id": "PER-3301", "name": "Suresh Reddy", "prior_fir": "FIR-2021-089", "offense": "NDPS Act Violation", "year": 2021, "case_status": "Convicted", "co_accused": "None"}
        ]
    )

    # 8. Registry — registry_records.xlsx
    write_csv("registry_records.xlsx",
        ["record_id", "date", "record_type", "registration_no", "owner_or_director", "address", "linked_entity", "registry_source"],
        [
            {"record_id": "REG-301", "date": "2022-03-15", "record_type": "Company", "registration_no": "U74999TG2022PTC1099", "owner_or_director": "Arjun Reddy", "address": "Plot 42, Secunderabad", "linked_entity": "Apex Logistics Pvt Ltd", "registry_source": "MCA Company Registry"},
            {"record_id": "REG-302", "date": "2024-01-10", "record_type": "Company", "registration_no": "U74999TG2024PTC4401", "owner_or_director": "Ravi Kumar", "address": "Plot 42, Secunderabad", "linked_entity": "Shell Entity Pvt Ltd", "registry_source": "MCA Company Registry"},
            {"record_id": "REG-303", "date": "2023-08-01", "record_type": "Vehicle", "registration_no": "TS09AB1234", "owner_or_director": "Arjun Reddy", "address": "Banjara Hills, Hyderabad", "linked_entity": "Apex Logistics Pvt Ltd", "registry_source": "RTO Vehicle Database"}
        ]
    )

    # Write README.txt
    with open(os.path.join(target_dir, "README.txt"), "w", encoding="utf-8") as f:
        f.write("Sample Dataset Folder: sample_data/\nContains 50 FIR txt files and 7 exact schema Excel data sources.\n")

if __name__ == "__main__":
    generate_sample_dataset("sample_data")
    print("Generated sample_data/ directory with all 8 sources!")
