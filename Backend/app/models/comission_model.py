from typing import Optional, List
from uuid import UUID, uuid4
from beanie import Document,Link ,Indexed
from pydantic import Field
from datetime import datetime
from enum import Enum


class Commission(Document):
    comission_id: UUID
    objectif_honoraire : str
    objectif_deblocage : str
    taux_objectif : str
    date_modified: datetime
    
    class Config:  
        use_enum_values = True
    



    class Collection:
        name = "commissions"
