from urllib import response
from uuid import UUID
from app.schemas.commission_schema import CommissionOut, CommissionUpdate, CommissionCreate
import pymongo
from fastapi import Depends, HTTPException
from app.models.user_model import User
from app.services.user_service import UserService
from app.api.api_v1.deps.user_deps import get_current_user
from fastapi import APIRouter,status,HTTPException
from typing import List
from app.services.commission_service import CommissionService


commission_router = APIRouter()

@commission_router.post('/create',  summary="Create new commission record", response_model=CommissionOut)
async def create_commission(data: CommissionCreate):
    return await CommissionService.create_comission(data)

@commission_router.post('/update', summary="Update Prospect by id")
async def update_commission(data: CommissionUpdate):
    return await CommissionService.update_comission(data)

@commission_router.get("/single", summary="Get commission", response_model=CommissionOut)
async def get_prospect():
    return await CommissionService.get_comission()
