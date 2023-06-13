from typing import Optional, List
from uuid import UUID, uuid4
from beanie import Document,Link ,Indexed
from pydantic import Field
from datetime import datetime
from enum import Enum

class StatusCredit(str, Enum):
    en_montage = "En montage", 
    envoi_banque = "Envoi Banque", 
    refuse = "Refusé", 
    informations_complementaires = "Informations complémentaires", 
    retour_a_charge = "Retour à charge", 
    accorde = "Accord bancaire", 
    accorde_sous_reserve = "Accord sous réserve", 
    annule = "Annulé", 
    validation_accord_contrat = "Validation accord & contrat", 
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
    montant_debloque: Optional[str] = ""
    montant_valide: Optional[str] = ""
    montant_venal : Optional[str]
    adresse_bien : Optional[dict]
    superficie : Optional[str]
    prospect_id : UUID
    titre_foncier : Optional[str]
    garanties : Optional[list]
    commentaires : Optional[str]
    promoteur_nom : Optional[str]
    promoteur : Optional[str]
    banque : Banque = Banque.pas_encore
    banque_envoye : Optional[list]
    statusCredit : StatusCredit = StatusCredit.en_montage
    date : Optional[datetime]
    hb : Optional[str]
    hc : Optional[str]
    status_honnaires: Optional[dict]
    engagements_bancaires:Optional[list]
    prospect_revenue: Optional[str]
    coemp: Optional[list[UUID]]
    date_debloque : Optional[datetime]
    agent_id: Optional[UUID]

    class Config:  
        use_enum_values = True
    



    class Collection:
        name = "credits"
