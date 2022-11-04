


from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from app.models.credit_model import StatusCredit


from beanie import Link

class BaseCredit(BaseModel):
    credit_id: UUID
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
    montant_venal : float
    adresse_bien : dict
    superficie : int
    statusCredit : StatusCredit = StatusCredit.encours

class CreditCreate(BaseModel):
    credit_id: UUID
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
    montant_venal : float
    adresse_bien : dict
    superficie : int
    statusCredit : StatusCredit = StatusCredit.encours
    prospect_id: UUID

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
    montant_venal : float
    adresse_bien : dict
    superficie : int


class CreditOut(BaseModel):
    credit_id: UUID
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
    montant_venal : float
    adresse_bien : dict
    superficie : int
    prospect_id: UUID
    statusCredit : StatusCredit

