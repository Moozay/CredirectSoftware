from http.client import HTTPException
from uuid import UUID
from app.schemas.demande_credit_schema import DemandeCreditCreate
from app.schemas.demande_credit_schema import DemandeCreditOut
from app.services.credit_service import CreditService
from app.schemas.prospect_schema import ProspectOut,ProspectUpdate,ProspectRecord
from app.models.demande_credit_model import DemandeCredit
from app.schemas.credit_schema import CreditOut, CreditUpdateStatus,CreditUpdateHonnaires, Credit_date, CreditCreate,CreditDisplay, CreditBulkUpdate
import pymongo
from fastapi import Depends, HTTPException
from app.models.user_model import User
from app.api.api_v1.deps.user_deps import get_current_user
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

@credit_router.post('/add_credit',  summary="Create and add new credi to exsiting record", response_model=CreditOut)
async def add_credit(data: CreditCreate):
    try:
        return await CreditService.add_credit(data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="credit not created"
        )

@credit_router.post('/demandeCredit', summary="Demande de Credit", response_model=DemandeCreditOut)
async def demande_credit(data : DemandeCreditCreate):
    return await CreditService.demande_credit(data)

@credit_router.post('/updatestatus', summary="Update credit by id", response_model=CreditOut)
async def update_credit(credit: CreditUpdateStatus):
    try:
        return await CreditService.update_credit_status(credit.credit_id, credit)
    except pymongo.errors.WriteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Échec de la mise à jour du crédit, vérifiez les informations et réessayez"
        )
@credit_router.post('/updatehonnaires', summary="Update credit by id", response_model=CreditOut)
async def update_credit(credit: CreditUpdateHonnaires):
    try:
        return await CreditService.update_credit_honnaires(credit.credit_id, credit)
    except pymongo.errors.WriteError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Échec de la mise à jour du crédit, vérifiez les informations et réessayez"
        )

@credit_router.post('/updatebulk', summary="Update credit by id", response_model=CreditOut)
async def update_credit(credit: CreditBulkUpdate):
    try:
        return await CreditService.update_credit_bulk(credit.credit_id, credit)
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


@credit_router.get('/download/dc/{credit_id}', summary="Get dc form credit by id", response_class=HTMLResponse)
async def get_dc(request: Request,credit_id: UUID):
    return await CreditService.download_dc(request,credit_id)



@credit_router.get('/download/facture/', summary="Get dc form credit by id", response_class=HTMLResponse)
async def get_facture(start, end, bank):
    return await CreditService.download_facture(start, end, bank)

@credit_router.get('/download/mandat/{type_credit}/{credit_id}', summary="Get mandat form credit by id", response_class=HTMLResponse)
async def get_mandat(request: Request,credit_id: UUID,type_credit: str):
    return await CreditService.download_mandat(request,credit_id,type_credit)

@credit_router.get('/all', summary="get all credits", response_model=List[CreditDisplay])
async def get_credits(user: User = Depends(get_current_user)):
    return await CreditService.get_credits(user)

@credit_router.get('/last_credit/{prospect_id}', summary="get prospect's last credit", response_model=List[CreditOut])
async def last_credit(prospect_id: UUID):
    return await CreditService.prospect_credits(prospect_id)

@credit_router.get('/bulkupdate', summary="get all credits", response_model=List[CreditOut])
async def get_credits_bulk_update(user: User = Depends(get_current_user)):
    return await CreditService.get_credits_bulk_update(user)

@credit_router.post('/bulk', summary="get all credits")
async def bulk_update():
    return await CreditService.bulk_update()

@credit_router.get("/record/{prospect_id}", summary="Get Record by Prospect id", response_model=ProspectRecord)
async def get_prospect(prospect_id: UUID):
    return await CreditService.get_prospect_record(prospect_id)

@credit_router.post("/record", summary="Update Record", response_model=ProspectRecord)
async def update_record(payLoad: ProspectRecord):
    return await CreditService.update_record(payLoad)

@credit_router.delete('/{credit_id}', summary="delete credit by id")
async def delete_credit(credit_id: UUID): 
    return await CreditService.delete_credit(credit_id)