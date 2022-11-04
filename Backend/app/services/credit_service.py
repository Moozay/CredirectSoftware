
from app.models.credit_model import StatusCredit
from app.models.prospect_model import Prospect
from app.schemas.demande_credit_schema import DemandeCreditCreate
from app.schemas.prospect_schema import ProspectOut, ProspectCreate
from app.schemas.credit_schema import CreditCreate , CreditUpdate, CreditOut
from uuid import UUID, uuid4
from typing import List, Optional
from app.models.credit_model import Credit 
from app.models.demande_credit_model import DemandeCredit
import pymongo


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
            montant_venal = credit.montant_venal,
            adresse_bien = credit.adresse_bien,
            superficie = credit.superficie,
            statusCredit = credit.statusCredit,
            prospect_id = credit.prospect_id
        )
        await credit_in.save()
        return credit_in

    @staticmethod
    async def update_credit(id: UUID, data: CreditUpdate) -> Credit:
        pass

    @staticmethod
    async def delete_credit(id: UUID):
        pass

    @staticmethod
    async def get_credits() -> List[Credit]:
        pass

    @staticmethod
    async def get_credit_by_id(id: UUID) -> Optional[Credit]:
        pass
    
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