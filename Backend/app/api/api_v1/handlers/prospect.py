from urllib import response
from uuid import UUID
from app.schemas.prospect_schema import ProspectOut,ProspectUpdate, ProspectRecord, ProspectCreate
import pymongo
from fastapi import Depends, HTTPException
from app.models.user_model import User
from app.services.user_service import UserService
from app.api.api_v1.deps.user_deps import get_current_user
from fastapi import APIRouter,status,HTTPException
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
            detail="Le prospect existe déjà"
        )

@prospect_router.post('/update', summary="Update Prospect by id")
async def update_prospect(data):
    return await ProspectService.update_prospect(data)

@prospect_router.get("/single/{prospect_id}", summary="Get single Prospect by id", response_model=ProspectOut)
async def get_prospect(prospect_id: UUID):
    return await ProspectService.get_prospect_by_id(prospect_id)

@prospect_router.get("/record/{prospect_id}", summary="Get single Prospect by id", response_model=ProspectRecord)
async def get_prospect(prospect_id: UUID):
    return await ProspectService.get_prospect_record(prospect_id)

@prospect_router.post('/agentupdate/{prospect_id}/{agent_id}', summary="update prospect's agent")
async def get_credits_bulk_update(prospect_id:UUID, agent_id:UUID):
    return await ProspectService.update_agent_update(prospect_id, agent_id)

@prospect_router.get('/all', summary="get all prospects", response_model=List[ProspectOut])
async def get_prospects(user: User = Depends(get_current_user)):
    return await ProspectService.get_prospects(user)

@prospect_router.delete('/{prospect_id}', summary="delete prospect by id")
async def delete_prospect(prospect_id: UUID): 
    return await ProspectService.delete_prospect(prospect_id)