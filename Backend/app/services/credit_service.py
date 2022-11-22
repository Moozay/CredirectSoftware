
from app.models.credit_model import StatusCredit
from app.models.prospect_model import Prospect
from app.services.prospect_service import ProspectService
from app.schemas.demande_credit_schema import DemandeCreditCreate
from app.schemas.prospect_schema import ProspectOut, ProspectCreate
from app.schemas.credit_schema import CreditCreate , CreditUpdate, CreditOut,CreditDisplay
from uuid import UUID, uuid4
from typing import List, Optional
from fastapi import Request
from fastapi.responses import FileResponse
from app.models.credit_model import Credit
from fastapi.templating import Jinja2Templates
from app.models.demande_credit_model import DemandeCredit
import pymongo
import os
import pdfkit


class CreditService:
    @staticmethod
    async def create_credit(credit: CreditCreate):
        credit_in = Credit(
            credit_id = credit.credit_id,
            type_credit = credit.type_credit,
            montant = credit.montant,
            duree_credit = credit.duree_credit,
            frequence = credit.frequence,
            mensualite = credit.mensualite,
            taux = credit.taux,
            franchise = credit.franchise,
            taux_endt = credit.taux_endt,
            teg = credit.teg,
            qot_financement = credit.qot_financement,
            objet_credit = credit.objet_credit,
            nature_bien = credit.nature_bien,
            etat_bien = credit.etat_bien,
            usage_bien = credit.usage_bien,
            montant_acte = credit.montant_acte,
            montant_travaux = credit.montant_travaux,
            montant_venal = credit.montant_venal,
            adresse_bien = credit.adresse_bien,
            superficie = credit.superficie,
            prospect_id = credit.prospect_id,
            statusCredit = credit.statusCredit,
        )
        await credit_in.save()
        return credit_in

    @staticmethod
    async def update_credit(id: UUID, data: CreditUpdate) -> Credit:
        credit = await Credit.find_one(Credit.credit_id == id)
        if not Credit:
            raise pymongo.errors.OperationFailure("Credit not found")
        
        await credit.update({"$set": data.dict(exclude_unset=True)})
        return credit
    
    @staticmethod
    async def get_dc(request: Request,credit_id: UUID):
        templates = Jinja2Templates(directory="app/static")
        context = {'request':request, 'name':'AHMED MUSA' }
        credit = await CreditService.get_credit_by_id(credit_id)
        prospect = await ProspectService.get_prospect_by_id(credit.prospect_id)
        context = {**context,'credit':credit, 'prospect':prospect}
        return templates.TemplateResponse("dc.html", context)
    
    @staticmethod
    async def create_dc(credit_id:UUID):
        filelocation = "app/temp/" + str(credit_id) + '.pdf'
        config = pdfkit.configuration(wkhtmltopdf='/usr/bin/wkhtmltopdf')
        html_url = "192.168.11.200:8000/api/v1/credits/demandecredit/2b3fabc3-4d68-4439-bf3b-3b49b58540b4"
        pdfkit.from_url(html_url,output_path=filelocation,configuration=config)

    @staticmethod
    async def download_dc(request: Request,credit_id: UUID):
        parentPath = os.path.dirname(__file__)
        path = "/../temp/"
        filePath = parentPath + path +str(credit_id) + '.pdf'
        st_abs = os.path.join(parentPath,filePath)
        if not (os.path.isfile(st_abs)):
            try:
                await CreditService.create_dc(credit_id)
            except OSError:
                return FileNotFoundError
        filename = os.path.basename(st_abs)
        headers = {'content-Dispostion':f'attachment; filename="{filename}"'}
        return FileResponse(st_abs,headers=headers,media_type='application/pdf')


    @staticmethod
    async def delete_credit(id: UUID):
        credit = await Credit.find_one(Credit.credit_id == id)
        if not credit:
            raise pymongo.errors.OperationFailure("Credit not Found")

        await credit.delete()
        return {
            "message" : "Credit deleted successfully"
        }

    @staticmethod
    async def get_credits() -> List[CreditDisplay]:
        credits_obj = await Credit.find_all().aggregate([{
            "$lookup":{
                "from":"prospects",
                "localField": "prospect_id",
                "foreignField": "prospect_id",
                "as": "prospectInfo"
            }
        },
        {
            "$unwind": {
                "path": "$prospectInfo"
            }
        },
        {
            "$project":{
                "credit_id":1,
                "prospect_id":1,
                "type_credit":1,
                "prospectInfo":{
                    "nom":1,
                    "prenom":1
                },
                "montant":1,
                "statusCredit":1
            }
        }]).to_list()
    
        return credits_obj

    @staticmethod
    async def get_credit_by_id(id: UUID) -> Optional[CreditOut]:
        credit = await Credit.find_one(Credit.credit_id == id)
        return credit
    
    @staticmethod
    async def demande_credit(data : DemandeCreditCreate):
        
        try:
            

            

            prospect_in = Prospect(
                prospect_id = data.prospect.prospect_id,
                nom = data.prospect.nom,
                prenom = data.prospect.prenom,
                datenaissance = data.prospect.datenaissance,
                lieunaissance = data.prospect.lieunaissance,
                nationalite = data.prospect.nationalite,
                adresse = data.prospect.adresse,
                telephone = data.prospect.telephone,
                situation = data.prospect.situation,
                profession = data.prospect.profession,
                telpro = data.prospect.telpro,
                datembauche = data.prospect.datembauche,
                revenue = data.prospect.revenue,
                coemp_id = data.prospect.coemp_id,
                agent_id = data.prospect.agent_id,
                renseignements_bancaires = data.prospect.renseignements_bancaires,
                engagements_bancaires =  data.prospect.engagements_bancaires,
                credits = data.prospect.credits
            )

            credit_in = Credit(
                credit_id = data.credit.credit_id,
                type_credit = data.credit.type_credit,
                montant = data.credit.montant,
                duree_credit = data.credit.duree_credit,
                frequence = data.credit.frequence,
                mensualite = data.credit.mensualite,
                taux = data.credit.taux,
                franchise = data.credit.franchise,
                taux_endt = data.credit.taux_endt,
                teg = data.credit.teg,
                qot_financement = data.credit.qot_financement,
                objet_credit = data.credit.objet_credit,
                nature_bien = data.credit.nature_bien,
                etat_bien = data.credit.etat_bien,
                usage_bien = data.credit.usage_bien,
                montant_acte = data.credit.montant_acte,
                montant_venal = data.credit.montant_venal,
                adresse_bien = data.credit.adresse_bien,
                superficie = data.credit.superficie,
                statusCredit = data.credit.statusCredit,
                prospect_id = data.prospect.prospect_id
            )
            demande_credit_obj = DemandeCredit(
                prospect= prospect_in,
                credit= credit_in,
                statusDemande= data.statusDemande
            )

            await prospect_in.save()
            await credit_in.save()
            await demande_credit_obj.save()
        except Exception as msg:
            raise msg

        return demande_credit_obj