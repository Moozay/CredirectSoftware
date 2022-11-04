from typing import Optional, List
from uuid import UUID, uuid4
from app.models.prospect_model import Prospect
from beanie import Document, Indexed
from pydantic import Field, EmailStr 
import datetime


from enum import Enum

class Role(str, Enum):
    admin = 'Admin'
    manager = 'Manager'
    agent = 'Agent'

class User(Document):
    user_id: UUID = Field(default_factory=uuid4)
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    user_name: Optional[str] = None
    phone: Optional[str]
    avatar: Optional[str] = None
    status: bool = True
    role: Role = Role.agent
    prospects : List[UUID] = []

    class Config:  
        use_enum_values = True
    
    def __repr__(self) -> str:
        return f"<User {self.email}>"
    
    def __str__(self) -> str:
        return self.email
    
    def __hash__(self) -> int:
        return hash(self.email)
    
    def __eq__(self, other:object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False
    
    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    @classmethod
    async def by_email(self, email: str) -> "User" :
        return await self.find_one(self.email == email)
    
    class Collection:
        name = "users"