from http.client import HTTPException
from urllib import response
from uuid import UUID
from app.schemas.prospect_schema import ProspectOut, ProspectUpdate, ProspectCreate
import pymongo
from fastapi import APIRouter
from typing import List
from app.services.prospect_service import ProspectService


prospect_router = APIRouter()

@prospect_router.post('/create',  summary="Create new prospect", response_model=ProspectOut)
async def create_prospect(data: ProspectCreate):
    try:
        return await ProspectService.create_prospect(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="Prospect already exist"
        )

@prospect_router.post('/update', summary="Update Prospect by id", response_model=ProspectOut)
async def update_prospect(prospect: ProspectUpdate):
    pass

@prospect_router.get("/single/{prospect_id}", summary="Get single Prospect by id", response_model=ProspectOut)
async def get_prospect(prospect_id: UUID):
    return await ProspectService.get_prospect_by_id(prospect_id)

@prospect_router.get('/all', summary="get all prospects", response_model=List[ProspectOut])
async def get_prospects():
    return await ProspectService.get_prospects()

@prospect_router.delete('/{prospect_id}', summary="delete prospect by id")
async def delete_prospect(prospect_id: UUID): 
    return await ProspectService.delete_prospect(prospect_id)