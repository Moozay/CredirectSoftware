from fastapi import APIRouter
from app.api.api_v1.handlers import user

from app.api.api_v1.auth.jwt import auth_router
from app.api.api_v1.handlers import prospect
from app.api.api_v1.handlers import credit
from app.api.api_v1.handlers import client
from app.api.api_v1.handlers import coemp

router = APIRouter()

router.include_router(user.user_router, prefix="/users", tags=["users"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])

router.include_router(prospect.prospect_router, prefix="/prospects", tags=["prospects"])
router.include_router(credit.credit_router, prefix="/credits", tags=["credits"])
router.include_router(client.client_router, prefix="/clients", tags=["clients"])
router.include_router(coemp.coemp_router, prefix="/coemps",tags=["coemps"])