from datetime import datetime
from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4


class Coemp(Document):
    coemp_id: UUID = Field(default_factory=uuid4)
    nom: str
    prenom: str
    datenaissance: datetime
    lieunaissance: str
    nationalite: str
    adresse: dict
    telephone: str
    situation: str
    profession : str
    telpro: str
    datembauche: datetime
    revenue: float
    prospect_id: UUID

class Config:  
    use_enum_values = True

class Collection:
    name = "coemps"