from fastapi import Depends, HTTPException
from app.models.user_model import User
from app.api.api_v1.deps.user_deps import get_current_user
from typing import List

class RoleChecker:
    def __init__(self, allowed_roles: List):
        self.allowed_roles = allowed_roles

    def __call__(self, user: User = Depends(get_current_user)):
        if user.role not in self.allowed_roles:
            raise HTTPException(status_code=403, detail="Operation not permitted")

