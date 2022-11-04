from app.models.credit_model import Credit
from app.models.prospect_model import Prospect

from pydantic import Field
from beanie import Document, Indexed
from uuid import UUID, uuid4

from enum import Enum

class StatusDemande(str, Enum):
    submitted = 'Submitted'
    validated = 'Validated'
    rejected = 'Rejected'
    queued = 'Queued'

class DemandeCredit(Document):
    demande_credit_id: UUID = Field(default_factory=uuid4, index=True)
    prospect: Prospect
    credit: Credit
    statusDemande: StatusDemande = StatusDemande.queued


    class Config:
        use_enum_values = True

    class Collection:
        name = "demandeCredits"