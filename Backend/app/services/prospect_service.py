
from app.models.coemp_model import Coemp
from app.services.coemp_service import CoempService
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
            cin_sejour = prospect.cin_sejour,
            datenaissance = prospect.datenaissance,
            lieunaissance = prospect.lieunaissance,
            nationalite = prospect.nationalite,
            adresse = prospect.adresse,
            telephone = prospect.telephone,
            situation = prospect.situation,
            profession = prospect.profession,
            rs_employeur = prospect.rs_employeur,
            datembauche = prospect.datembauche,
            revenue = prospect.revenue,
            coemp_id = prospect.coemp_id,
            agent_id = prospect.agent_id,
            renseignements_bancaires = prospect.renseignements_bancaires,
            engagements_bancaires =  prospect.engagements_bancaires,
            credits = prospect.credits,
            participation = prospect.participation,
            type_profession =  prospect.type_profession,
            source = prospect.source,
            caisse = prospect.caisse,
            parrainage = prospect.parrainage,
            agent = prospect.agent,
        )
        await prospect_in.save()
        return prospect_in


    @staticmethod
    async def update_prospect(data: dict):
       await Prospect.find(Prospect.cin_sejour == data.id).update({"$set":{Prospect.adresse.ville : data.ville}})

    @staticmethod
    async def get_prospect_record(id: UUID):
        prospect = await Prospect.find_one(Prospect.prospect_id == id)
        co_emp = None
        if prospect.coemp_id is not None:
            co_emp = await CoempService.get_coemp_by_id(prospect.coemp_id)
        record = {
            'prospect':prospect,
            'co_emp':co_emp,
        }
        if not Prospect:
            raise pymongo.errors.OperationFailure("Prospect not found")
        return record

        

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
    async def get_prospects(user) -> List[ProspectOut]:
        prospectList = await Prospect.find_all().to_list()
        if user.role ==  'Agent':
            newList = []
            for record in prospectList:
                if str(record.agent_id) == str(user.user_id):
                    newList.append(record)
            prospectList = newList
        return prospectList

    @staticmethod
    async def get_prospect_by_id(id: UUID) -> Optional[ProspectOut]:
        prospect = await Prospect.find_one(Prospect.prospect_id == id)
        return prospect

# nom prenom telephone nationalité type_credit montant actions

