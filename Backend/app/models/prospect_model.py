from datetime import datetime
from pydantic import Field
from beanie import Document,Link, Indexed
from uuid import UUID, uuid4
from typing import Optional, List

class Adresse(Document):
    pays : str
    adresse1: str
    ville: str
class Prospect(Document):
    prospect_id: UUID
    nom: str
    prenom: str
    cin_sejour: Indexed(str, unique=True)
    datenaissance: datetime
    lieunaissance: str
    nationalite: str
    adresse: dict
    telephone: str
    situation: str
    profession : Optional[str]
    rs_employeur: Optional[str]
    datembauche: datetime
    revenue: Optional[str]
    coemp_id: Optional[UUID] 
    agent_id: UUID 
    renseignements_bancaires: List = []
    engagements_bancaires: List = []
    credits: List[UUID]
    participation: str
    type_profession: str
    source: str
    caisse: Optional[str]
    parrainage: Optional[str]
    agent: Optional[str]

    
    class Config:  
        use_enum_values = True
   

        
    class Collection:
        name = "prospects"


