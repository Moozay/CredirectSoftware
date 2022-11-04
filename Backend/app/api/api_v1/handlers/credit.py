from http.client import HTTPException
from uuid import UUID
from app.schemas.demande_credit_schema import DemandeCreditCreate
from app.schemas.demande_credit_schema import DemandeCreditOut
from app.services.credit_service import CreditService
from app.schemas.prospect_schema import ProspectOut
from app.models.demande_credit_model import DemandeCredit
from app.schemas.credit_schema import CreditOut, CreditUpdate, CreditCreate
import pymongo
from fastapi import APIRouter
from typing import List

credit_router = APIRouter()

@credit_router.post('/create',  summary="Create new credit", response_model=CreditOut)
async def create_credit(data: CreditCreate):
    try:
        return await CreditService.create_credit(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="credit already exist"
        )

@credit_router.post('/demandeCredit', summary="Demande de Credit", response_model=DemandeCreditOut)
async def demande_credit(data : DemandeCreditCreate):
    return await CreditService.demande_credit(data)

@credit_router.post('/update', summary="Update credit by id", response_model=CreditOut)
async def update_credit(credit: CreditUpdate):
    pass

@credit_router.get('/single/${credit_id}', summary="Get single credit by id", response_model=CreditOut)
async def get_credit(credit_id: UUID):
    pass

@credit_router.get('/all', summary="get all credits", response_model=List[CreditOut])
async def get_credits():
    pass

@credit_router.delete('/{credit_id}', summary="delete credit by id")
async def delete_credit(credit_id: UUID): 
    pass