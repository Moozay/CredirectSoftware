from app.schemas.commission_schema import CommissionCreate , CommissionOut, CommissionUpdate
from uuid import UUID, uuid4
from typing import List, Optional
from app.models.comission_model import Commission
from datetime import date, datetime




class CommissionService:
    @staticmethod
    async def create_comission(comission: CommissionCreate):
        comission_in = Commission(
            comission_id=uuid4(),
            objectif_honoraire= comission.objectif_honoraire,
            objectif_deblocage= comission.objectif_deblocage,
            taux_objectif = comission.taux_objectif,
            date_modified = datetime.utcnow().isoformat()
        )
        await comission_in.save()
        return comission_in

    @staticmethod
    async def update_comission(data: CommissionUpdate) -> Commission:
        data.date_modified = datetime.utcnow()
        await Commission.find_one(Commission.comission_id == data.comission_id).update({'$set': data})

    @staticmethod
    async def delete_comission(id: UUID):
        pass

    @staticmethod
    async def get_comission() -> CommissionOut:
         return await Commission.find_one()
