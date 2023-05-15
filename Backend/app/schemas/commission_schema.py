
from datetime import datetime
from typing import Optional,Union
from pydantic import BaseModel, Field
from uuid import UUID, uuid4



class BaseCommission(BaseModel):
    comission_id: UUID
    objectif_honoraire : str
    objectif_deblocage : str
    taux_objectif : str
    date_modified: datetime

class CommissionCreate(BaseModel):
    objectif_honoraire : str
    objectif_deblocage : str
    taux_objectif : str


class CommissionOut(BaseModel):
    comission_id: UUID
    objectif_honoraire : str
    objectif_deblocage : str
    taux_objectif : str
    date_modified: datetime

class CommissionUpdate(BaseModel):
    comission_id: UUID
    objectif_honoraire : str
    objectif_deblocage : str
    taux_objectif : str
