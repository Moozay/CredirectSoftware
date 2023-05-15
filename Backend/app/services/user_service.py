from app.core.security import verify_password
from app.schemas.user_schema import UserAuth, UserUpdate
from app.models.user_model import User
from app.core.security import get_password
from typing import List, Optional
from uuid import UUID
import pymongo

class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        user_in = User(
            email= user.email,
            user_name= user.user_name,
            phone= user.phone,
            hashed_password = get_password(user.password),
            role= user.role
        )
        await user_in.save()
        return user_in

    @staticmethod
    async def update_user(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
    
        await user.update({"$set": data.dict(exclude_unset=True)})
        return user

    @staticmethod
    async def delete_user(id: UUID):
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
    
        await user.delete()
        return {
            "message": "User deleted successfully"
        }

    @staticmethod
    async def update_user_avatar(id: UUID, data: UserUpdate) -> User:
        user = await User.find_one(User.user_id == id)
        if not user:
            raise pymongo.errors.OperationFailure("User not found")
    
        await user.update({"$set": data.dict(exclude_unset=True)})
        return user

    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_email(email=email)
        if not user:
            return None
        if not verify_password(password=password, hashed_pass=user.hashed_password):
            return None

        return user

    @staticmethod
    async def get_users() -> List[User]:
        return await User.find_all().to_list()
        
    @staticmethod
    async def get_agents() -> List[User]:
        return await User.find_many(User.role != "Admin").to_list()


    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        return user 

    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        user = await User.find_one(User.user_id == id)
        return user 
