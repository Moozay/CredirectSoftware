from uuid import UUID
from app.models.credit_model import Credit

from pydantic import BaseModel, Field

class ClientCreate(BaseModel):
    prospect_id : UUID
    credit_id: UUID

class ClientUpdate(BaseModel):
    prospect_id : UUID
    credit_id : UUID

class ClientOut(BaseModel):
    client_id : UUID
    prospect_id : UUID
    credit_id : UUID