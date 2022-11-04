
from app.models.coemp_model import Coemp
from app.schemas.prospect_schema import ProspectCreate , ProspectUpdate, ProspectOut
from uuid import UUID
from typing import List, Optional
from app.models.prospect_model import Prospect 
import pymongo


class ProspectService:
    @staticmethod
    async def create_prospect(prospect: ProspectCreate):
        prospect_in = Prospect(
            prospect_id = prospect.prospect_id,
            nom = prospect.nom,
            prenom = prospect.prenom,
            datenaissance = prospect.datenaissance,
            lieunaissance = prospect.lieunaissance,
            nationalite = prospect.nationalite,
            adresse = prospect.adresse,
            telephone = prospect.telephone,
            situation = prospect.situation,
            profession = prospect.profession,
            telpro = prospect.telpro,
            datembauche = prospect.datembauche,
            revenue = prospect.revenue,
            coemp_id = prospect.coemp_id,
            agent_id = prospect.agent_id,
            renseignements_bancaires = prospect.renseignements_bancaires,
            engagements_bancaires =  prospect.engagements_bancaires,
            credits = prospect.credits
        )
        await prospect_in.save()
        return prospect_in

    @staticmethod
    async def update_prospect(id: UUID, data: ProspectUpdate) -> Prospect:
        prospect = await Prospect.find_one(Prospect.prospect_id == id)
        if not Prospect:
            raise pymongo.errors.OperationFailure("Prospect not found")
        
        await prospect.update({"$set": data.dict(exclude_unset=True)})
        return prospect

    @staticmethod
    async def delete_prospect(id: UUID):
        prospect = await Prospect.find_one(Prospect.prospect_id == id)
        if not prospect:
            raise pymongo.errors.OperationFailure("Prospect not Found")

        await prospect.delete()
        return {
            "message" : "Prospect deleted successfully"
        }

    @staticmethod
    async def get_prospects() -> List[ProspectOut]:
        return await Prospect.find_all().to_list()

    @staticmethod
    async def get_prospect_by_id(id: UUID) -> Optional[ProspectOut]:
        prospect = await Prospect.find_one(Prospect.prospect_id == id)
        return prospect

# nom prenom telephone nationalité type_credit montant actions

