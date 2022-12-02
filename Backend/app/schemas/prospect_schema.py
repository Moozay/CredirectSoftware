from datetime import datetime
from app.schemas.credit_schema import BaseCredit


from app.models.coemp_model import Coemp
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
    profession: str = Field(..., min_length=1, max_length=50, description="propect profession")
    rs_employeur: str = Field(..., min_length=1, max_length=50, description="propect professional phone ")
    datembauche: datetime = Field(...)
    revenue: str 
    coemp_id: Optional[UUID] = Field(...)
    agent_id: UUID = Field(...)
    renseignements_bancaires: List = [] 
    engagements_bancaires: List = []
    credits: List[UUID]

class ProspectUpdate(BaseModel):
    prospect_id: UUID
    nom: str 
    prenom: str
    cin_sejour: str 
    datenaissance: datetime 
    lieunaissance: str 
    nationalite: str 
    adresse: str
    telephone: str 
    situation: str 
    profession: str 
    rs_employeur: str 
    datembauche: datetime
    revenue: str

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
    profession: str 
    rs_employeur: str 
    datembauche: datetime
    revenue: str 
    renseignements_bancaires: List = []
    engagements_bancaires: List = []
    coemp_id: Optional[UUID]
    agent_id: UUID   
    credits: List[UUID]


