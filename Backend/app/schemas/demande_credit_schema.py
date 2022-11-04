from enum import Enum
from app.schemas.credit_schema import CreditCreate
from app.schemas.prospect_schema import ProspectCreate
from app.models.prospect_model import Prospect
from app.models.credit_model import Credit

from pydantic import BaseModel, Field
from app.models.demande_credit_model import StatusDemande
from uuid import UUID


class DemandeCreditCreate(BaseModel):
    prospect : ProspectCreate
    credit : CreditCreate
    statusDemande : StatusDemande = StatusDemande.queued

class DemandeCreditUpdate(BaseModel):
    prospect : ProspectCreate
    credit : CreditCreate
    statusDemande : StatusDemande

class DemandeCreditOut(BaseModel):
    demande_credit_id: UUID
    prospect : ProspectCreate
    credit : CreditCreate
    statusDemande : StatusDemande
