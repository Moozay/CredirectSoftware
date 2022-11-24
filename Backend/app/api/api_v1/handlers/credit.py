from http.client import HTTPException
from uuid import UUID
from app.schemas.demande_credit_schema import DemandeCreditCreate
from app.schemas.demande_credit_schema import DemandeCreditOut
from app.services.credit_service import CreditService
from app.schemas.prospect_schema import ProspectOut
from app.models.demande_credit_model import DemandeCredit
from app.schemas.credit_schema import CreditOut, CreditUpdate, CreditCreate,CreditDisplay
import pymongo
from fastapi import APIRouter,Request,status
from fastapi.responses import HTMLResponse
from typing import List

credit_router = APIRouter()

@credit_router.post('/create',  summary="Create new credit", response_model=CreditOut)
async def create_credit(data: CreditCreate):
    try:
        return await CreditService.create_credit(data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="credit not created"
        )

@credit_router.post('/demandeCredit', summary="Demande de Credit", response_model=DemandeCreditOut)
async def demande_credit(data : DemandeCreditCreate):
    return await CreditService.demande_credit(data)

@credit_router.post('/update', summary="Update credit by id", response_model=CreditOut)
async def update_credit(credit: CreditUpdate):
    try:
        return await CreditService.update_credit(credit.credit_id, credit)
    except pymongo.errors.WriteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Échec de la mise à jour du crédit, vérifiez les informations et réessayez"
        )

@credit_router.get('/single/{credit_id}', summary="Get single credit by id", response_model=CreditOut)
async def get_credit(credit_id: UUID):
    return await CreditService.get_credit_by_id(credit_id)


@credit_router.get('/demandecredit/{credit_id}', summary="Get dc form credit by id", response_class=HTMLResponse)
async def get_dc(request: Request,credit_id: UUID):
    return await CreditService.get_dc(request,credit_id)


@credit_router.get('/download/{credit_id}', summary="Get dc form credit by id", response_class=HTMLResponse)
async def get_dc(request: Request,credit_id: UUID):
    return await CreditService.download_dc(request,credit_id)


@credit_router.get('/all', summary="get all credits", response_model=List[CreditDisplay])
async def get_credits():
    return await CreditService.get_credits()

@credit_router.delete('/{credit_id}', summary="delete credit by id")
async def delete_credit(credit_id: UUID): 
    return await CreditService.delete_credit(credit_id)