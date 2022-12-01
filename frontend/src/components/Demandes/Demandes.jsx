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
  Code
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
} from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import Demande from "./Demande/Demande";
import EditableColumn from "components/Tables/EditableColumn";
import ReadOnlyColumn from "components/Tables/ReadOnlyColumn";
import axiosInstance from "services/axios";
import { DemandeContext } from "context/DemandeContext";
import { saveAs } from "file-saver";
import NavItem from "components/Sidebar/NavItem";
import { useMemo } from "react";

const Demandes = () => {
  const { demandes, setDemandes } = useContext(DemandeContext);
  const [editCreditForm, setEditCreditForm] = useState({});
  const [editCreditId, setEditCreditId] = useState(null);
  const status = [
    "En cours",
    "Envoie Bank",
    "Autorisation",
    "Refus",
    "Accord",
    "Ajournement",
    "Retour en Charge",
    "Autorisation Avec Conditions",
    "Acceptation Avec Conditions",
    "Derogation Avec Conditions",
  ];
  const [demande, setDemande] = useState([]);
  const { setReloadDemandes } = useContext(DemandeContext);
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState();
  const toast = useToast();

  const handleClick = (event, demandeData) => {
    event.preventDefault();
    setDemande(demandeData);
    onOpen();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const getFilteredList = () => {
    if (!selectedCategory) {
      return demandes;
    }
    return demandes.filter((credit) => credit.statusCredit == selectedCategory);
  };
  const filteredList = useMemo(getFilteredList, [selectedCategory, demandes]);

  const handleDownload = async (event, id) => {
    event.preventDefault();
    const response = await axiosInstance.get(`/credits/download/${id}`, {
      params: {
        cacheBustTimestamp: Date.now(),
      },
      responseType: "blob",
      headers: {
        Accept: "application/ocet-stream",
      },
    });
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = id + ".pdf";
    link.click();
    toast({
      title: `dossier de prêt téléchargé`,
      status: "success",
      isClosable: true,
      duration: 1500,
    });
  };

  //credit update

  const hanldeEditClick = (event, credit) => {
    event.preventDefault();
    setEditCreditId(credit.credit_id);
    const formValues = {
      credit_id: credit.credit_id,
      statusCredit: credit.statusCredit,
    };
    setEditCreditForm(formValues);
  };

  const handleEditCreditChange = (event) => {
    const newFormCredit = { ...editCreditForm };
    newFormCredit["statusCredit"] = event.target.value;
    setEditCreditForm(newFormCredit);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedCredit = editCreditForm;
    const newDemandes = [...demandes];
    const index = demandes.findIndex(
      (credit) => credit.credit_id == editCreditId
    );
    newDemandes[index].statusCredit = editedCredit.statusCredit;

    const updateStatus = storeCredit(editedCredit);
    if (updateStatus === "true") {
      setDemandes(newDemandes);
    }
    setEditCreditId(null);
  };

  const storeCredit = async (editedCredit) => {
    var status = "false";
    axiosInstance
      .post("/credits/update", editedCredit)
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

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const response = await axiosInstance.delete(`/credits/${id}`);
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
      <Demande isOpen={isOpen} onClose={onClose} demande={demande} />
      <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"} colorSchema="blue">
          <TagLeftIcon as={MdOutlineRuleFolder} />
          <TagLabel>Listes des Demandes</TagLabel>
        </Tag>
        <Tag size={"lg"} colorSchema="blue">
          <TagLeftIcon as={MdOutlineFilterAlt} />
          <Select
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
        </Tag>
      </HStack>

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
            <Table size="lg">
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
                    Montant Credit
                  </Th>
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Status demande
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
                {filteredList.map((demande) => {
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
                        {demande.montant}
                      </Td>
                      {editCreditId == demande.credit_id ? (
                        <EditableColumn
                          editCreditForm={editCreditForm}
                          handleEditCreditChange={handleEditCreditChange}
                          handleEditFormSubmit={handleEditFormSubmit}
                          handleCancel={handleCancel}
                          status={status}
                        />
                      ) : (
                        <ReadOnlyColumn
                          demande={demande}
                          handleEditClick={hanldeEditClick}
                          handleDelete={handleDelete}
                          handleClick={handleClick}
                          handleDownload={handleDownload}
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
