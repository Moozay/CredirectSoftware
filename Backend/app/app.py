from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings

from app.api.api_v1.router import router

from app.models.user_model import User
from app.models.prospect_model import Prospect
from app.models.credit_model import Credit
from app.models.coemp_model import Coemp
from app.models.demande_credit_model import DemandeCredit
from app.models.client_model import Client



from fastapi.staticfiles import StaticFiles



app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version=settings.VERSION
)


app.add_middleware(
    CORSMiddleware,
    allow_origins = settings.BACKEND_CORS_ORIGINS,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.on_event("startup")
async def app_init():
    """
        initialize crucial application services 
    """
    
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).credirectDB
    
    await init_beanie(
        database=db_client,
        document_models= [
            User,
            Prospect,
            Credit,
            Coemp,
            DemandeCredit,
            Client
        ]
    )  

app.include_router(router, prefix=settings.API_V1_STR)




