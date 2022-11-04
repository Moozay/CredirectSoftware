from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from uuid import UUID
from app.models.prospect_model import Prospect
from app.models.user_model import Role

class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    user_name: str = Field(..., min_length=5, max_length=50, description="user  name")
    phone: str = Field(..., min_length=10, max_length=20, description="user phone")
    role: Role = Field(..., description="user role")
    prospects : List[UUID] = []
    
class UserUpdate(BaseModel):
    user_id: UUID
    email: EmailStr
    user_name: Optional[str]
    phone: Optional[str]
    avatar: Optional[str] = None
    status: Optional[bool] = True
    role: Role

class UserOut(BaseModel):
    user_id: UUID
    email: EmailStr
    user_name: Optional[str]
    phone: Optional[str]
    avatar: Optional[str]
    status: Optional[bool]
    role: Role
    prospects : List[UUID]


