from typing import Optional, List
from uuid import UUID, uuid4


from beanie import Document,Link ,Indexed
from pydantic import Field
import datetime
from enum import Enum

class StatusCredit(str, Enum):
    en_montage = "En montage", 
    envoi_banque = "Envoi Banque", 
    refuse = "Refusé", 
    informations_complementaires = "Informations complémentaires", 
    retour_a_charge = "Retour à charge", 
    accorde = "Accordé", 
    accorde_sous_reserve = "Accordé sous réserve", 
    annule = "Annulé", 
    accord_valide = "Accord Validé", 
    contrat_disponibles = "Contrats disponibles", 
    debloque = "Débloqué"
class Banque(str, Enum):
    pas_encore = "-"
    sgmb = "SGMB"
    bp = "BP"
    cdm = "CDM"
    bmci = "BMCI"
    sofac = "SOFAC"
    eqdom = "EQDOM"
    wafasalaf = "WAFASALAF"
class Credit(Document):
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
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[str]
    commentaires : str
    banque : Banque = Banque.pas_encore
    statusCredit : StatusCredit = StatusCredit.en_montage

    class Config:  
        use_enum_values = True
    



    class Collection:
        name = "credits"
