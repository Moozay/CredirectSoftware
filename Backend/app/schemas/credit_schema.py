

from datetime import datetime
from typing import Optional,Union
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from app.models.credit_model import StatusCredit, Banque


from beanie import Link

class BaseCredit(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    taux_demande : Optional[str]
    franchise : Optional[str]
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_travaux: Optional[str]
    montant_debloque: str = ""
    montant_valide: Optional[str] = ""
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    statusCredit : StatusCredit = StatusCredit.en_montage
    prospect_id = UUID
    titre_foncier : Optional[str]
    garanties : Optional[list]
    commentaires : Optional[str]
    promoteur_nom : Optional[str]
    banque : Banque = Banque.pas_encore
    banque_envoye : Optional[list]
    date : Optional[datetime]
    hb : Optional[str]
    hc : Optional[str]
    status_honnaires: Optional[dict]
    engagements_bancaires:Optional[list]
    prospect_revenue: Optional[str]
    coemp: Optional[list[UUID]]
    date_debloque : Optional[datetime]




class CreditCreate(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    taux_demande : Optional[str]
    franchise : Optional[str]
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_debloque: str = ""
    montant_valide: Optional[str] = ""
    montant_venal : Optional[str]
    montant_travaux: Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[list]
    statusCredit : StatusCredit = StatusCredit.en_montage
    commentaires : Optional[str]
    promoteur_nom : Optional[str]
    promoteur : Optional[str]
    banque : Banque = Banque.pas_encore
    banque_envoye : Optional[list]
    date : Optional[datetime]
    hb : Optional[str]
    hc : Optional[str]
    status_honnaires: Optional[dict]
    engagements_bancaires:Optional[list]
    prospect_revenue: Optional[str]
    coemp: Optional[list[UUID]]
    date_debloque : Optional[datetime]
    agent_id: Optional[UUID]





class CreditBulkUpdate(BaseModel):
    credit_id : UUID
    hb: Optional[str]
    hc: Optional[str]

class CreditUpdateHonnaires(BaseModel):
    credit_id : UUID
    hc: Optional[str]
    status_honnaires: Optional[dict]
    
class CreditUpdateStatus(BaseModel):
    credit_id : UUID
    statusCredit : StatusCredit
    montant_valide: str
    montant_debloque: str
    banque : Banque
    hb : Optional[str]
    hc : Optional[str]
    status_honnaires: Optional[dict]
    date_debloque : Optional[datetime]

    """  type_credit : Optional[str]
    montant : Optional[str]
    duree_credit : Optional[str]
    frequence : Optional[str]
    mensualite : Optional[str]
    taux : Optional[str]
    franchise : Optional[str]
    taux_endt : Optional[str]
    teg : Optional[str]
    qot_financement : Optional[str]
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_travaux: Optional[str]
    montant_venal : Optional[float]
    adresse_bien : Optional[dict]
    superficie : Optional[str] """


class CreditOut(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    taux_demande : Optional[str]
    franchise : Optional[str]
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_travaux: Optional[str]
    montant_debloque: Optional[str]
    montant_valide: Optional[str]
    montant_acte : Optional[str]
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    statusCredit : StatusCredit
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[list]
    commentaires : Optional[str]
    banque : Banque
    promoteur_nom : Optional[str]
    promoteur : Optional[str]
    banque_envoye : Optional[list]
    date : Optional[datetime]
    hb : Optional[str]
    hc : Optional[str]
    status_honnaires: Optional[dict]
    engagements_bancaires:Optional[list]
    prospect_revenue: Optional[str]
    coemp: Optional[list[UUID]]
    date_debloque : Optional[datetime]
    agent_id: Optional[UUID]



class CreditDisplay(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    taux_demande : Optional[str]
    franchise : Optional[str]
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_travaux: Optional[str]
    montant_debloque: str
    montant_valide: Optional[str]
    montant_acte : Optional[str]
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    statusCredit : StatusCredit
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[list]
    commentaires : Optional[str]
    banque : Banque
    hb : Optional[str]
    hc : Optional[str]
    banque_envoye : Optional[list]
    promoteur_nom : Optional[str]
    promoteur : Optional[str]
    date : Optional[datetime]
    prospectInfo: dict
    agentInfo: dict
    status_honnaires: Optional[dict]
    engagements_bancaires:Optional[list]
    prospect_revenue: Optional[str]
    coemp: Optional[list[UUID]]
    date_debloque : Optional[datetime]
    agent_id: Optional[UUID]
   
class Credit_date(BaseModel):
    credit_id: UUID
    creation_date: str
    email : str