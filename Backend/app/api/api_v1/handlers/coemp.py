from http.client import HTTPException
from uuid import UUID
from app.schemas.coemp_schema import CoempOut, CoempUpdate, CoempCreate

from fastapi import APIRouter
from typing import List
from app.services.coemp_service import CoempService


coemp_router = APIRouter()

@coemp_router.post('/create',  summary="Create new Coemp", response_model=CoempOut)
async def create_coemp(data: CoempCreate):
    try:
        return await CoempService.create_coemp(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="Coemp already exist"
        )

@coemp_router.post('/update', summary="Update Coemp by id", response_model=CoempOut)
async def update_coemp(coemp: CoempUpdate):
    pass

@coemp_router.get('/single/${coemp_id}', summary="Get single Coemp by id", response_model=CoempOut)
async def get_coemp(coemp_id: UUID):
    pass

@coemp_router.get('/all', summary="get all Coemps", response_model=List[CoempOut])
async def get_coemps():
    pass

@coemp_router.delete('/{coemp_id}', summary="delete Coemp by id")
async def delete_coemp(coemp_id: UUID): 
    pass