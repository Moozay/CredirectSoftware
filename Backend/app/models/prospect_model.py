from datetime import datetime
from app.schemas.prospect_schema import ProspectCreate
from app.schemas.credit_schema import BaseCredit
from pydantic import Field
from beanie import Document,Link, Indexed
from uuid import UUID, uuid4
from typing import Optional, List


class Prospect(Document):
    prospect_id: UUID
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
    telpro: str
    datembauche: datetime
    revenue: float
    coemp_id: Optional[UUID] 
    agent_id: UUID 
    renseignements_bancaires: List = []
    engagements_bancaires: List = []
    credits: List[BaseCredit] 
    
    class Config:  
        use_enum_values = True
   

        
    class Collection:
        name = "prospects"


