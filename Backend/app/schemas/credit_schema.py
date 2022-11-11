


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
    objet_credit : str
    nature_bien : str
    etat_bien : str
    usage_bien : str
    montant_acte : str
    montant_travaux: str
    montant_venal : str
    adresse_bien : dict
    superficie : str
    statusCredit : StatusCredit = StatusCredit.encours
    prospect_id = str

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
    objet_credit : str
    nature_bien : str
    etat_bien : str
    usage_bien : str
    montant_acte : str
    montant_venal : str
    montant_travaux: str
    adresse_bien : dict
    superficie : str
    statusCredit : StatusCredit = StatusCredit.encours
    prospect_id = str
    
class CreditUpdate(BaseModel):
    type_credit : str
    montant : float
    duree_credit : int
    frequence : str
    mensualite : int
    taux : int
    franchise : int
    taux_endt : int
    teg : int
    qot_financement : int
    objet_credit : str
    nature_bien : str
    etat_bien : str
    usage_bien : str
    montant_acte : float
    montant_travaux: str
    montant_venal : float
    adresse_bien : dict
    superficie : int


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
    objet_credit : str
    nature_bien : str
    etat_bien : str
    usage_bien : str
    montant_acte : str
    montant_venal : str
    adresse_bien : dict
    superficie : int
    statusCredit : StatusCredit
    prospect_id = str

