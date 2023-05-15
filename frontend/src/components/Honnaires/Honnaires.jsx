import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useMemo,
} from "react";
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
import { MdPayments, MdSearch, MdOutlineFilterAlt } from "react-icons/md";
import { DemandeContext } from "context/DemandeContext";
import { CreditContext } from "context/CreditContext";
import axiosInstance from "services/axios";
import EditableColumn from "components/Tables/EditableColumnHonnaires";
import ReadOnlyColumn from "components/Tables/ReadOnlyColumnHonnaires";
import CurrencyFormat from "react-currency-format";
import { UserContext } from "context/UserContext";

const Honnaires = () => {
  const { demandes, setDemandes } = useContext(DemandeContext);
  const { changeStringToFloat } = useContext(CreditContext);
  const { user, setUser } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState([
    "Validation accord & contrat",
    "Débloqué",
  ]);
  const [searchParams, setSearchParams] = useState("");
  const [editCreditForm, setEditCreditForm] = useState({});
  const [editCreditId, setEditCreditId] = useState(null);
  const toast = useToast();
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchParams(event.target.value);
  };

  const filterCategory = (demandes) => {
    return demandes.filter((credit) =>
      selectedCategory.includes(credit.statusCredit)
    );
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

  const handleEditCreditChange = (event, name) => {
    event.preventDefault();

    var fieldName = event.target.getAttribute("name");
    var fieldValue = null;
    const newFormCredit = { ...editCreditForm };
    if (event.target.getAttribute("type") == "checkbox") {
      fieldValue = event.target.checked;
      newFormCredit["status_honnaires"][fieldName] = fieldValue;
      console.log(fieldValue);
    } else {
      fieldValue = event.target.value;
      newFormCredit[fieldName] =
        fieldValue === "" ? "0" : changeStringToFloat(fieldValue);
      console.log(fieldValue);
    }
    setEditCreditForm(newFormCredit);
  };
  const handleCancel = () => {
    setEditCreditId(null);
    setEditCreditForm({});
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedCredit = editCreditForm;
    const newDemandes = [...demandes];
    const index = demandes.findIndex(
      (credit) => credit.credit_id == editCreditId
    );
    newDemandes[index].hc = editedCredit.hc;
    newDemandes[index].status_honnaires = editedCredit.status_honnaires;

    const formValues = {
      credit_id: editedCredit.credit_id,
      hc: editedCredit.hc,
      status_honnaires: editedCredit.status_honnaires,
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
      .post("/credits/updatehonnaires", editedCredit)
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

  const handleEditClick = (event, credit) => {
    event.preventDefault();
    setEditCreditId(credit.credit_id);
    setEditCreditForm(credit);
    console.log(credit);
  };

  return (
    <>
      <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"} colorScheme="blue">
          <TagLeftIcon as={MdPayments} />
          <TagLabel>Listes des Honnaires</TagLabel>
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
      </Flex>
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
            <Table size="lg" variant={"simple"}>
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
                    M. Debloqué
                  </Th>
                  {user["role"] !== "Agent" && (
                    <Th
                      textAlign="center"
                      style={{
                        padding: 3,
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      M. HB
                    </Th>
                  )}
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    M. HC
                  </Th>
                  {user["role"] !== "Agent" && (
                    <Th
                      textAlign="center"
                      style={{
                        padding: 3,
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      HB
                    </Th>
                  )}
                  <Th
                    textAlign="center"
                    style={{
                      padding: 3,
                      overflowWrap: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    HC
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
                        {demande.statusCredit}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.montant_valide}
                      </Td>
                      <Td
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {demande.montant_debloque}
                      </Td>
                      {user["role"] !== "Agent" && (
                        <Td
                          textAlign="center"
                          style={{
                            padding: 1,
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {demande.hb === null ? (
                            ""
                          ) : (
                            <CurrencyFormat
                              decimalSeparator=","
                              thousandSeparator=" "
                              decimalScale={2}
                              isNumericString
                              fixedDecimalScale={true}
                              name="montant_debloque"
                              value={demande["hb"]}
                              displayType="text"
                            />
                          )}
                        </Td>
                      )}
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
                          status={status}
                          demande={demande}
                          handleEditClick={handleEditClick}
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

export default Honnaires;
