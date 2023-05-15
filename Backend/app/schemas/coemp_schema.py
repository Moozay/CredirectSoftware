from datetime import datetime
from pydantic import BaseModel, Field
from uuid import UUID

class CoempCreate(BaseModel):
    coemp_id: UUID
    nom : str = Field(..., description="Nom du Co-emprunteur")
    prenom : str = Field(..., description="Prenom du Co-emprunteur")
    cin_sejour: str = Field(...,description="Id du Co-emprunteur")
    datenaissance : datetime 
    lieunaissance: str = Field(..., description="Lieu de naissance du Coemprunteur")
    nationalite: str = Field(..., description="Nationalite du Co-emprunteur")
    adresse: dict 
    telephone: str = Field(..., min_length=1, max_length=50, description="prospect phone")
    situation: str = Field(..., min_length=1, max_length=50, description="prospect situation")
    profession: str = Field(..., min_length=1, max_length=50, description="prospect profession")
    rs_employeur: str = Field(..., min_length=1, max_length=50, description="prospect professional phone ")
    datembauche: datetime
    revenue: str 
    prospect_id: UUID
    participation: str

class CoempUpdate(BaseModel):
    nom : str 
    prenom : str
    cin_sejour : str 
    datenaissance : datetime 
    lieunaissance: str 
    nationalite: str 
    adresse: str 
    telephone: str 
    situation: str 
    profession: str 
    rs_employeur: str 
    datembauche: datetime
    revenue: str 

class CoempOut(BaseModel):
    coemp_id: UUID
    nom : str 
    prenom : str
    cin_sejour : str 
    datenaissance : datetime 
    lieunaissance: str 
    nationalite: str 
    adresse: dict 
    telephone: str 
    situation: str 
    profession: str 
    rs_employeur: str 
    datembauche: datetime
    revenue: str 
    prospect_id: UUID
    participation: str




