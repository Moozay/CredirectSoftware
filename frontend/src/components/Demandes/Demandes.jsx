import React, { useEffect, useState, Fragment, useContext } from "react";
import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Stack,
  Skeleton,
  useToast,
  HStack,
  Button,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  IconButton,
  useDisclosure,
  Code,
  Box,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";
import { IoDownloadSharp } from "react-icons/io5";

import {
  AiOutlineUserAdd,
  AiOutlineDelete,
  AiOutlineFolderView,
} from "react-icons/ai";
import {
  MdEditNote,
  MdOutlineFilterAlt,
  MdOutlineRuleFolder,
  MdSearch,
} from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import Demande from "./Demande/Demande";
import EditableColumn from "components/Tables/EditableColumn";
import ReadOnlyColumn from "components/Tables/ReadOnlyColumn";
import axiosInstance from "services/axios";
import { DemandeContext } from "context/DemandeContext";
import { useMemo } from "react";
import Confirmation from "components/Modals/Confirmation";
import { UpdateContext } from "context/UpdateContext";

const Demandes = () => {
  const { demandes, setDemandes } = useContext(DemandeContext);
  const { changeStringToFloat } = useContext(UpdateContext);
  const [editCreditForm, setEditCreditForm] = useState({});
  const [editCreditId, setEditCreditId] = useState(null);
  const status = [
    "En montage",
    "Envoi Banque",
    "Informations complémentaires",
    "Accord bancaire",
    "Accord sous réserve",
    "Annulé",
    "Refusé",
    "Retour à charge",
    "Validation accord & contrat",
    "Débloqué",
  ];

  const banques = [
    "SGMB",
    "BP",
    "CDM",
    "BMCI",
    "SOFAC",
    "EQDOM",
    "WAFASALAF",
    "NAJMAH",
    "YOUSR",
    "CIH",
    "WAFA Immobilier",
    "CFG",
    "ABB",
  ];
  const [demande, setDemande] = useState([]);
  const { setReloadDemandes } = useContext(DemandeContext);
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState();
  const [searchParams, setSearchParams] = useState("");
  const toast = useToast();

  const handleClick = (event, demandeData) => {
    event.preventDefault();
    setDemande(demandeData);
    onOpen();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchParams(event.target.value);
  };

  const filterCategory = (demandes) => {
    if (!selectedCategory) {
      return demandes;
    }
    return demandes.filter((credit) => credit.statusCredit == selectedCategory);
  };

  const filterName = (demandes) => {
    if (searchParams == "") {
      return demandes;
    } else {
      return demandes.filter((credit) => 
      credit.prospectInfo.nom.toLowerCase().startsWith(searchParams.toLowerCase())
      );
    }
  };

  const getFilteredList = () => {
    var list = filterCategory(demandes);
    list = filterName(list);
    return list;
  };
  const filteredList = useMemo(getFilteredList, [
    selectedCategory,
    demandes,
    searchParams,
  ]);

  const handleDownloadDc = async (event, demande) => {
    event.preventDefault();
    const response = await axiosInstance.get(
      `/credits/download/dc/${demande.credit_id}`,
      {
        params: {
          cacheBustTimestamp: Date.now(),
        },
        responseType: "blob",
        headers: {
          Accept: "application/ocet-stream",
        },
      }
    );
    const data =
      demande.prospectInfo.nom +
      "-" +
      demande.prospectInfo.prenom +
      "-" +
      demande.type_credit;
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = data + ".pdf";
    link.click();
    toast({
      title: `dossier de prêt téléchargé`,
      status: "success",
      isClosable: true,
      duration: 1500,
    });
  };

  const handleDownloadMandat = async (event, demande) => {
    event.preventDefault();
    const response = await axiosInstance.get(
      `/credits/download/mandat/${demande.type_credit}/${demande.credit_id}`,
      {
        params: {
          cacheBustTimestamp: Date.now(),
        },
        responseType: "blob",
        headers: {
          Accept: "application/ocet-stream",
        },
      }
    );
    const data =
      demande.prospectInfo.nom + "-" + demande.prospectInfo.prenom + "-mandat";
    const blob = new Blob([response.data], { type: "application/ocet-stream" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = data + ".docx";
    link.click();
    toast({
      title: `mandat téléchargé`,
      status: "success",
      isClosable: true,
      duration: 1500,
    });
  };

  //credit update

  const handleEditClick = (event, credit) => {
    event.preventDefault();
    setEditCreditId(credit.credit_id);
    setEditCreditForm(credit);
    console.log(credit);
  };

  const handleEditCreditChange = (event, name) => {
    const newFormCredit = { ...editCreditForm };
    newFormCredit[event.target.name] = event.target.value;
    setEditCreditForm(newFormCredit);
  };

  const calculeConsoHc = (demande) => {
    var mt;
    if (demande["montant_valide"] === "") {
      mt = demande["montant"];
    } else mt = demande["montant_valide"];
    mt = changeStringToFloat(mt);
    if (mt <= 20000) {
      return 1000;
    } else if (mt <= 30000) {
      return 1500;
    } else if (mt <= 40000) {
      return 2000;
    } else if (mt <= 50000) {
      return 3000;
    } else if (mt <= 75000) {
      return 3500;
    } else if (mt <= 100000) {
      return 4000;
    } else if (mt <= 300000) {
      return 5000;
    } else if (mt >= 300000) {
      return (3 / 100) * mt;
    }
  };

  const calculateHypoHc = (demande) => {
    var montant;
    if (demande["montant_valide"] === "") {
      montant = changeStringToFloat(demande["montant"]);
      return (5 / 100) * montant;
    } else {
      montant = changeStringToFloat(demande["montant_valide"]);
      return (5 / 100) * montant;
    }
  };

  const calculateImmoHc = (demande) => {
    var montant;
    if (demande["montant_debloque"] === "") {
      montant = changeStringToFloat(demande["montant"]);
    } else {
      montant = changeStringToFloat(demande["montant_debloque"]);
    }
    if (montant <= 500000) {
      return 5000;
    } else return (1 / 100) * montant;
  };
  const calculateHc = (demande) => {
    var montant = 0;
    switch (demande["type_credit"]) {
      case "consommation":
        montant = calculeConsoHc(demande);
        break;
      case "hypothecaire":
        montant = calculateHypoHc(demande);
        break;
      case "immobilier":
        montant = calculateImmoHc(demande);
        break;
      default:
        montant = 0;
        break;
    }
    return montant.toFixed(2);
  };

  const calculateHypoHb = (demande) => {
    var montant = 0;
    if (demande["banque"] != "-") {
      if (demande["montant_debloque"] === "") {
        if (demande["montant_valide"] === "") {
          montant = changeStringToFloat(demande["montant"]);
        } else {
          montant = changeStringToFloat(demande["montant_valide"]);
        }
      } else {
        montant = changeStringToFloat(demande["montant_debloque"]);
      }
      if (demande["banque"] !== "SOFAC") {
        return (2 / 100) * montant;
      } else {
        switch (demande["taux"]) {
          case "14":
            return (2 / 100) * montant;
          case "12":
            return (1.5 / 100) * montant;
          case "10":
            return (1 / 100) * montant;
          default:
            return 0;
        }
      }
    }
    return 0;
  };

  const calculeConsoHb = (demande) => {
    var montant = 0;
    if (demande["banque"] != "-") {
      if (demande["montant_debloque"] === "") {
        if (demande["montant_valide"] === "") {
          montant = changeStringToFloat(demande["montant"]);
        } else {
          montant = changeStringToFloat(demande["montant_valide"]);
        }
      } else {
        montant = changeStringToFloat(demande["montant_debloque"]);
      }
      if (demande["banque"] == "SOFAC") {
        if (demande["prospectInfo"]["type_profession"] === "Retraité") {
          if (demande["prospectInfo"]["caisse"] === "RCAR") {
            return (3 / 100) * montant;
          } else if (demande["prospectInfo"]["caisse"] === "CNSS") {
            return (2 / 100) * montant;
          } else if (demande["prospectInfo"]["caisse"] === "CMR") {
            return (2.5 / 100) * montant;
          } else if (demande["prospectInfo"]["caisse"] === "CIMR") {
            return (1.5 / 100) * montant;
          }
        } else if (
          demande["prospectInfo"]["type_profession"] !== "Retraité" &&
          demande["prospectInfo"]["type_profession"] !== "Fonctionnaire"
        ) {
          return (2 / 100) * montant;
        } else if (
          demande["prospectInfo"]["type_profession"] === "Fonctionnaire"
        ) {
          return (2.5 / 100) * montant;
        }
      }
    }
    return 0;
  };

  const bankClientChecker = (prospectInfo) => {
    var prospectBanques = [];
    prospectInfo["renseignements_bancaires"].map((value) => {
      prospectBanques.push(value["banque"]);
    });
    return prospectBanques;
  };
  const calculateImmoHb = (demande) => {
    var montant = 0;
    var prospectBanques = bankClientChecker(demande["prospectInfo"]);
    if (demande["montant_debloque"] === "") {
      if (demande["montant_valide"] === "") {
        montant = changeStringToFloat(demande["montant"]);
      } else {
        montant = changeStringToFloat(demande["montant_valide"]);
      }
    } else {
      montant = changeStringToFloat(demande["montant_debloque"]);
    }
    switch (demande["banque"]) {
      case "BP":
        if (prospectBanques.includes("BP") === true) {
          return (0.5 / 100) * montant;
        } else {
          if (montant <= 40000000 && montant > 600000) {
            return (1 / 100) * montant;
          } else if (montant > 4000000) {
            return (1.2 / 100) * montant;
          }
        }
        return 0;

      case "BMCI":
        if (montant < 1000000) {
          return (1 / 100) * montant;
        } else if (montant > 100000 && montant <= 2000000) {
          return (1.2 / 100) * montant;
        } else if (montant > 2000000) {
          return (1.4 / 100) * montant;
        }
        return 0;

      case "SGMB":
        if (prospectBanques.includes("BP") === false && montant >= 500000) {
          return (1 / 100) * montant;
        } else {
          return 0;
        }

      case "CDM":
        if (prospectBanques.includes("BP") === false && montant >= 500000) {
          return (1 / 100) * montant;
        } else {
          return 0;
        }

      default:
        return 0;
    }
  };

  const calculateHb = (demande) => {
    var montant;
    switch (demande["type_credit"]) {
      case "consommation":
        montant = calculeConsoHb(demande);
        break;
      case "hypothecaire":
        montant = calculateHypoHb(demande);
        break;
      case "immobilier":
        montant = calculateImmoHb(demande);
        break;
      default:
        montant = 0;
        break;
    }
    return montant.toFixed(2);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedCredit = editCreditForm;
    const newDemandes = [...demandes];
    const index = demandes.findIndex(
      (credit) => credit.credit_id == editCreditId
    );
    if (editedCredit["statusCredit"] === status[8]) {
      editedCredit["hc"] = calculateHc(editCreditForm);
    } else if (editedCredit["statusCredit"] === status[9]) {
      editedCredit["hc"] = calculateHc(editCreditForm);
      editedCredit["hb"] = calculateHb(editCreditForm);
    }
    newDemandes[index].statusCredit = editedCredit.statusCredit;
    newDemandes[index].banque = editedCredit.banque;
    newDemandes[index].montant_debloque = editedCredit.montant_debloque;
    newDemandes[index].montant_valide = editedCredit.montant_valide;
    newDemandes[index].hb = editedCredit.hb;
    newDemandes[index].hc = editedCredit.hc;

    const formValues = {
      credit_id: editedCredit.credit_id,
      statusCredit: editedCredit.statusCredit,
      montant_debloque: editedCredit.montant_debloque,
      montant_valide: editedCredit.montant_valide,
      banque: editedCredit.banque,
      hb: editedCredit.hb,
      hc: editedCredit.hc,
    };
    const updateStatus = storeCredit(formValues);
    if (updateStatus === "true") {
      setDemandes(newDemandes);
    }
    setEditCreditId(null);
  };

  const storeCredit = async (editedCredit) => {
    var status = "false";
    axiosInstance
      .post("/credits/updatestatus", editedCredit)
      .then((response) => {
        toast({
          title: `Crédit mis à jour avec succès`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        status = "true";
      })
      .catch((error) => {
        toast({
          title:
            "Échec de la mise à jour du crédit, vérifiez les informations et réessayez",
          status: "error",
          isClosable: true,
          duration: 1500,
        });
      });
    return status;
  };

  const handleCancel = () => {
    setEditCreditId(null);
    setEditCreditForm({});
  };
  const [showConfirmation, setShowConfirmation] = useState({
    show: false,
    payLoad: {},
  });

  const handleDeleteClick = (demande) => {
    setShowConfirmation({
      show: true,
      payLoad: demande,
    });
  };

  const handleDelete = async (event, demande) => {
    event.preventDefault();
    const response = await axiosInstance.delete(
      `/credits/${demande.credit_id}`
    );
    setReloadDemandes(true);
    toast({
      title: `${response.data.message}`,
      status: "success",
      isClosable: true,
      duration: 1500,
    });
  };

  useEffect(() => {
    console.log(demandes);
    console.log("reloaded");
  }, [demandes]);

  return (
    <>
      <Demande
        status={status}
        isOpen={isOpen}
        onClose={onClose}
        demande={demande}
      />
      <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"} colorScheme="blue">
          <TagLeftIcon as={MdOutlineRuleFolder} />
          <TagLabel>Listes des Demandes</TagLabel>
        </Tag>
      </HStack>
      <Flex m={3}>
        <Box>
          <InputGroup>
            <InputLeftElement children={<MdSearch />} />
            <Input
              size={"sm"}
              placeholder="Chercher..."
              value={searchParams}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Box>
        <Spacer />
        <Box>
          <Select
            icon={<MdOutlineFilterAlt />}
            size="sm"
            name="catergory-list"
            textAlign="center"
            defaultValue=""
            onChange={handleCategoryChange}
          >
            <option value="" key={"tout"}>
              Tout
            </option>

            {status.map((status) => {
              return (
                <option value={status} key={status}>
                  {status}
                </option>
              );
            })}
          </Select>
        </Box>
      </Flex>
      <Confirmation
        header={`Supprimer demande: ${showConfirmation.payLoad.type_credit}`}
        content={"Voulez-vous effectuer cette opération ?"}
        setShowConfirmation={setShowConfirmation}
        showConfirmation={showConfirmation.show}
        payLoad={showConfirmation.payLoad}
        action={handleDelete}
      />

      {filteredList.length > 0 ? (
        <TableContainer
          m={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="4px"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "2px",
              height: "2px",
            },
            "&::-webkit-scrollbar-track": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          <form>
            <Table size="lg" variant={"striped"}>
              <Thead>
                <Tr>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Nom
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Prenom
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    CIN/SEJOUR
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Type de Credit
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Agent
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    M. Credit
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Status
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    M. Validé
                  </Th>

                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    M. Débloqué
                  </Th>

                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Banque
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredList.map((demande, index) => {
                  return (
                    <Tr key={demande.credit_id}>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.prospectInfo.nom}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.prospectInfo.prenom}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.prospectInfo.cin_sejour}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.type_credit}
                      </Td>

                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.prospectInfo.agentInfo.user_name}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.montant}
                      </Td>
                      {editCreditId == demande.credit_id ? (
                        <EditableColumn
                          editCreditForm={editCreditForm}
                          handleEditCreditChange={handleEditCreditChange}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleCancel={handleCancel}
                          status={status}
                          banques={banques}
                        />
                      ) : (
                        <ReadOnlyColumn
                          status={status}
                          demande={demande}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                          handleClick={handleClick}
                          handleDownloadDc={handleDownloadDc}
                          handleDownloadMandat={handleDownloadMandat}
                        />
                      )}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </form>
        </TableContainer>
      ) : (
        <Stack>
          <Code mt={2}>Aucun Enregistrement Trouvé</Code>
        </Stack>
      )}
    </>
  );
};

export default Demandes;
