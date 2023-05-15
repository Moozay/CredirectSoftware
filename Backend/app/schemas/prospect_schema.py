from datetime import datetime
from app.schemas.credit_schema import BaseCredit
from app.schemas.coemp_schema import CoempOut
from app.schemas.credit_schema import CreditOut
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from typing import List, Optional
from beanie import Link


class ProspectCreate(BaseModel):
    prospect_id: UUID
    nom: str = Field(..., min_length=1, max_length=50, description="prospect first name")
    prenom: str = Field(..., min_length=1, max_length=50, description="prospect last name")
    cin_sejour: str = Field(...,min_length=1, max_length=50, description="prospect id")
    datenaissance: datetime = Field(...)
    lieunaissance: str = Field(..., min_length=1, max_length=50, description="prospect birth adress")
    nationalite: str = Field(..., min_length=1, max_length=50, description="prospect nationality")
    adresse: dict
    telephone: str = Field(..., min_length=1, max_length=50, description="prospect phone")
    situation: str = Field(..., min_length=1, max_length=50, description="prospect situation")
    profession: Optional[str]
    rs_employeur: Optional[str]
    datembauche: datetime = Field(...)
    revenue: Optional[str] 
    coemp_id: Optional[UUID] = Field(...)
    agent_id: UUID = Field(...)
    renseignements_bancaires: List = [] 
    engagements_bancaires: List = []
    credits: List[UUID]
    participation: str
    type_profession: str
    source: str
    caisse: Optional[str]
    parrainage: Optional[str]
    agent: Optional[str]




class ProspectOut(BaseModel):
    prospect_id: UUID
    nom: str 
    prenom: str 
    cin_sejour:str
    datenaissance: datetime 
    lieunaissance: str 
    nationalite: str 
    adresse: dict
    telephone: str 
    situation: str 
    profession: Optional[str] 
    rs_employeur: Optional[str] 
    datembauche: datetime
    revenue: Optional[str] 
    renseignements_bancaires: List = []
    engagements_bancaires: List = []
    coemp_id: Optional[UUID]
    agent_id: UUID   
    credits: List[UUID]
    participation: str
    type_profession: str
    source: str
    caisse: Optional[str]
    parrainage: Optional[str]
    agent: Optional[str]




class ProspectUpdate(BaseModel):
    prospect_id: UUID
    nom: str 
    prenom: str 
    cin_sejour:str
    datenaissance: datetime 
    lieunaissance: str 
    nationalite: str 
    adresse: dict
    telephone: str 
    situation: str 
    profession: str 
    rs_employeur: str 
    datembauche: datetime
    
class ProspectRecord(BaseModel):
    prospect: ProspectOut
    co_emp: Optional[CoempOut]
    credit: Optional[CreditOut]