from typing import Optional, List
from uuid import UUID, uuid4


from beanie import Document,Link ,Indexed
from pydantic import Field
import datetime
from enum import Enum

class StatusCredit(str, Enum):
    encours = "En cours"
    envoie_bank = "Envoie Bank"
    autorisation = "Autorisation"
    refus = "Refus"
    accord = "Accord"
    ajournement = "Ajournement"
    retour_charge = "Retour en Charge"
    auto_condition = "Autorisation Avec Conditions"
    acceptation_condition = "Acceptation Avec Conditions"
    derogation_conditions = "Derogation Avec Conditions"

class Credit(Document):
    credit_id :  UUID 
    type_credit: str
    montant: float
    duree_credit: int
    frequence: str
    mensualite: int
    taux: int 
    franchise: int
    taux_endt: int
    teg: int 
    qot_financement: int
    objet_credit: str
    nature_bien: str
    etat_bien: str
    usage_bien: str
    montant_acte: float
    montant_venal: float
    adresse_bien: dict
    superficie: int
    prospect_id: UUID  
    statusCredit : StatusCredit = StatusCredit.encours

    class Config:  
        use_enum_values = True
    



    class Collection:
        name = "credits"
