from typing import List
from pydantic import BaseSettings, AnyHttpUrl
from decouple import config 

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str) 
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str) 
    ALGORITHM= "HS256"
    ACCESS_TOKEN_EXPIRES_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRE_MINUTES:int = 60 * 24 * 7 # 7 days
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://192.168.11.200:3000",
        "http://192.168.11.200:3100",
        "http://197.230.72.125:3000",
    ]
    PROJECT_NAME: str = "CREDIRECT PROJECT"
    VERSION: str = "1.1"
    
    # Database
    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)
    
    class Config:
        case_sensitive = True

settings = Settings()