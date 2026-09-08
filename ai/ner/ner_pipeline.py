"""
NER Pipeline — Entity extraction using spaCy.
TODO Phase 1: Fine-tune on Indian-language crime domain data.
"""
from dataclasses import dataclass, field
from typing import List
# import spacy  # Uncomment after: pip install spacy && python -m spacy download en_core_web_trf


@dataclass
class ExtractedEntity:
    text: str
    label: str           # PERSON | ORG | LOCATION | PHONE | VEHICLE | BANK_ACCOUNT
    start: int
    end: int
    confidence: float = 1.0
    source_doc_id: str = ""


class NERPipeline:
    """
    Named Entity Recognition pipeline.
    Phase 1: spaCy en_core_web_trf (English).
    Phase 2: Fine-tune for Indian language crime corpus + Organization class.
    """

    ENTITY_LABEL_MAP = {
        "PERSON": "PERSON",
        "ORG": "ORGANIZATION",
        "GPE": "LOCATION",
        "LOC": "LOCATION",
        "FAC": "LOCATION",
    }

    def __init__(self, model_name: str = "en_core_web_trf"):
        # self.nlp = spacy.load(model_name)
        self.nlp = None  # TODO: load spaCy model
        print(f"[NERPipeline] Initialized (model={model_name})")

    def extract(self, text: str, source_doc_id: str = "") -> List[ExtractedEntity]:
        """Extract entities from translated English text."""
        if self.nlp is None:
            raise RuntimeError("spaCy model not loaded. Install and load en_core_web_trf.")
        doc = self.nlp(text)
        entities = []
        for ent in doc.ents:
            label = self.ENTITY_LABEL_MAP.get(ent.label_, ent.label_)
            entities.append(ExtractedEntity(
                text=ent.text,
                label=label,
                start=ent.start_char,
                end=ent.end_char,
                source_doc_id=source_doc_id,
            ))
        # TODO: add regex-based extractors for Phone, Vehicle (Indian formats), BankAccount
        return entities
