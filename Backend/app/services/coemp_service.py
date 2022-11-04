from app.schemas.coemp_schema import CoempCreate , CoempUpdate, CoempOut
from uuid import UUID
from typing import List, Optional
from app.models.coemp_model import Coemp



class CoempService:
    @staticmethod
    async def create_coemp(coemp: CoempCreate):
        coemp_in = Coemp(
            coemp_id = coemp.coemp_id,
            nom = coemp.nom,
            prenom = coemp.prenom,
            datenaissance = coemp.datenaissance,
            lieunaissance = coemp.lieunaissance,
            nationalite = coemp.nationalite,
            adresse = coemp.adresse,
            telephone = coemp.telephone,
            situation = coemp.situation,
            profession = coemp.profession,
            telpro = coemp.telpro,
            datembauche = coemp.datembauche,
            revenue = coemp.revenue,
            prospect_id = coemp.prospect_id
        )
        await coemp_in.save()
        return coemp_in

    @staticmethod
    async def update_coemp(id: UUID, data: CoempUpdate) -> Coemp:
        pass

    @staticmethod
    async def delete_coemp(id: UUID):
        pass

    @staticmethod
    async def get_coemps() -> List[Coemp]:
        pass

    @staticmethod
    async def get_coemp_by_id(id: UUID) -> Optional[Coemp]:
        pass