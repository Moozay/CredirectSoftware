from app.models.prospect_model import Prospect
from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4

class Client(Document):
    client_id: UUID = Field(default_factory=uuid4)
    prospect_id: UUID
    credit_id: UUID

    class Config:  
        use_enum_values = True

    class Collection:
        name = "clients"
