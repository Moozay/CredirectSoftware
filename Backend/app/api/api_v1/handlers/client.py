from http.client import HTTPException
from urllib import response
from uuid import UUID
from app.schemas.client_schema import ClientOut, ClientUpdate, ClientCreate
import pymongo
from fastapi import APIRouter
from typing import List

client_router = APIRouter()

@client_router.post('/create',  summary="Create new client", response_model=ClientOut)
async def create_client(data: ClientCreate):
    try:
        pass
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="client already exist"
        )

@client_router.post('/update', summary="Update client by id", response_model=ClientOut)
async def update_client(client: ClientUpdate):
    pass

@client_router.get('/single/${client_id}', summary="Get single client by id", response_model=ClientOut)
async def get_client(client_id: UUID):
    pass

@client_router.get('/all', summary="get all clients", response_model=List[ClientOut])
async def get_clients():
    pass

@client_router.delete('/{client_id}', summary="delete client by id")
async def delete_client(client_id: UUID): 
    pass