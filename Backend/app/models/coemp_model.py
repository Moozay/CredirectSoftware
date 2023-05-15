from datetime import datetime
from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4

class Coemp(Document):
    coemp_id: UUID = Field(default_factory=uuid4)
    nom: str
    prenom: str
    cin_sejour: str
    datenaissance: datetime
    lieunaissance: str
    nationalite: str
    adresse: dict
    telephone: str
    situation: str
    profession : str
    rs_employeur: str
    datembauche: datetime
    revenue: float
    prospect_id: UUID
    participation: str

class Config:  
    use_enum_values = True

class Collection:
    name = "coemps"
