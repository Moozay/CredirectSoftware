from app.schemas.client_schema import ClientCreate , ClientUpdate, ClientOut
from uuid import UUID
from typing import List, Optional
from app.models.client_model import Client 
import pymongo


class ClientService:
    @staticmethod
    async def create_client(client: ClientCreate):
        pass

    @staticmethod
    async def update_client(id: UUID, data: ClientUpdate) -> Client:
        pass

    @staticmethod
    async def delete_client(id: UUID):
        pass

    @staticmethod
    async def get_clients() -> List[Client]:
        pass

    @staticmethod
    async def get_client_by_id(id: UUID) -> Optional[Client]:
        pass