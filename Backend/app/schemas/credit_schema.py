


from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from app.models.credit_model import StatusCredit


from beanie import Link

class BaseCredit(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    franchise : str
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_travaux: Optional[str]
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    statusCredit : StatusCredit = StatusCredit.encours
    prospect_id = UUID
    titre_foncier : Optional[str]
    garanties : Optional[str]
    commentaires : str
    agent_id: UUID



class CreditCreate(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    duree_credit : str
    frequence : str
    mensualite : str
    taux : str
    franchise : str
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_venal : Optional[str]
    montant_travaux: Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[str]
    statusCredit : StatusCredit = StatusCredit.encours
    commentaires : str
    agent_id: UUID



    
class CreditUpdate(BaseModel):
    credit_id : UUID
    statusCredit : StatusCredit
    """  type_credit : str
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
    franchise : str
    taux_endt : str
    teg : str
    qot_financement : str
    objet_credit : Optional[str]
    nature_bien : Optional[str]
    etat_bien : Optional[str]
    usage_bien : Optional[str]
    montant_acte : Optional[str]
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    statusCredit : StatusCredit
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[str]
    commentaires : str
    agent_id: UUID


class CreditDisplay(BaseModel):
    credit_id: UUID
    type_credit : str
    montant : str
    statusCredit : StatusCredit
    prospect_id : UUID
    prospectInfo: dict
    commentaires : str


