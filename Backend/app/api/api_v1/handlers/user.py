from uuid import UUID
from app.models.user_model import Role
from app.schemas.user_schema import UserOut, UserAuth, UserUpdate
from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from app.models.user_model import User
from app.services.user_service import UserService
from app.api.api_v1.deps.user_deps import get_current_user
from typing import List
import pymongo
import shutil
import os 
from app.api.api_v1.deps.permissions import RoleChecker

user_router = APIRouter()

admin_required = RoleChecker(["Admin","Manager"])

@user_router.post('/create', summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth , user:User = Depends(admin_required)):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exist"
        )

@user_router.post('/update', summary='Update User with id ', response_model=UserOut)
async def update_user(user: UserUpdate):
    try:
        return await UserService.update_user(user.user_id, user)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist"
        )

@user_router.get('/me', summary='Get details of currently logged in user', response_model=UserOut)
async def get_me(user: User = Depends(get_current_user)):
    return user

@user_router.post('/update_profile', summary="update profile", response_model=UserOut)
async def update_profile(data: UserUpdate, user:User = Depends(get_current_user)):
    try:
        return await UserService.update_user(user.user_id, data)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="User does not exist"
        )

@user_router.post('/update_profile/image', summary="update user profile image ")
async def update_avatar(avatar: UploadFile = File(...), user:User = Depends(get_current_user)):

    
    parent_dir_path = os.path.abspath('..')
    
    with open(f"{parent_dir_path}\\Backend\\app\static\{avatar.filename}", "wb+") as buffer:
        shutil.copyfileobj(avatar.file, buffer)

    try:
        user.avatar = avatar.filename
        return await UserService.update_user(user.user_id, user)
    except pymongo.errors.OperationFailure:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail="User does not exist"
        )

@user_router.get('/all', summary="get all users", response_model=List[UserOut])
async def get_users(user:User = Depends(get_current_user)):
    return await UserService.get_users()


@user_router.get('/all_active', summary="get all active users", response_model=List[UserOut])
async def get_users(user:User = Depends(get_current_user)):
    return await UserService.get_active_users()


@user_router.get('/agents', summary="get all agents", response_model=List[UserOut])
async def get_users(user:User = Depends(get_current_user)):
    return await UserService.get_agents()

@user_router.delete('/{user_id}', summary="delete user by id")
async def delete_user(user_id: UUID):
    return await UserService.delete_user(user_id)