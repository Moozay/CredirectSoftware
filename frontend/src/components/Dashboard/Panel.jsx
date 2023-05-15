import React, { useContext, useState, useMemo, useEffect } from "react";
import { UserContext } from "context/UserContext";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import {
  Flex,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  Stat,
  useColorMode,
  CheckboxGroup,
  Checkbox,
  VStack,
  HStack,
  Stack,
  Text,
  Grid,
  GridItem,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Divider,
  Container,
  Button,
  TableContainer,
  Code,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";
import axiosInstance from "services/axios";
import DatePicker from "react-datepicker";
import {
  AiOutlineCalendar,
  AiOutlineExport,
  AiOutlineFileDone,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import DemandeCredit from "../Credits/DemandeCredit/DemandeCredit";
import { UpdateContext } from "context/UpdateContext";
import { DemandeContext } from "context/DemandeContext";
import {
  MdOutlineRuleFolder,
  MdOutlineGppGood,
  MdOutlineGppBad,
  MdBlock,
  MdSend,
  MdCheckCircle,
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdOutlineSubdirectoryArrowRight,
  MdPayments,
  MdOtherHouses,
  MdOutlineInsertDriveFile,
} from "react-icons/md";
import CurrencyFormat from "react-currency-format";
import { getActiveElement } from "@testing-library/user-event/dist/utils";
import { StatContext } from "context/StatContext";
import FileSaver from "file-saver";
import { queries } from "@testing-library/react";

const Panel = () => {
  const { colorMode } = useColorMode();
  const { user, setUser } = useContext(UserContext);
  const { changeStringToFloat } = useContext(UpdateContext);
  const { demandes, setDemandes } = useContext(DemandeContext);
  const { commissionData, setCommissionData } = useContext(StatContext);
  const [agentCommission, setAgentCommission] = useState({
    objectif_totale: "0",
    taux_realisation: "0",
    commission: "0",
    realisation: "0",
  });

  const [users, setUsers] = useState([]);

  const [filteredList, setFilteredList] = useState([]);
  const [factureList, setFactureList] = useState([]);

  const banqueList = [
    "SGMB",
    "BP",
    "CDM",
    "BMCI",
    "SOFAC",
    "EQDOM",
    "WAFASALAF",
    'NAJMAH',
    'YOUSR',
    'CIH',
    'WAFA Immobilier',
    'CFG',
    'ABB',
  ];


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

  const headers = [
    [
      "Nom",
      "Prenom",
      "Montant Demandé",
      "Montant Validé",
      "Montant Debloqué",
      "Status",
      "Banque",
      "HC",
      "HB",
    ],
  ];

  const initialize = async () => {
    if (user["role"] !== "Agent") {
      const response = await axiosInstance.get("/users/agents");
      console.log(response.data);
      setUsers(response.data);
    }
  };
  const agentList = useMemo(initialize, []);
  const toast = useToast();
  const [showList, setShowList] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState([]);
  const [selectedBanque, setSelectedBanque] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    end: null,
  });

  const [stat, setStat] = useState({
    debloque: {
      montant: 0,
      nombre: 0,
    },
    demande: {
      montant: 0,
      nombre: 0,
    },
    accord: {
      montant: 0,
      nombre: 0,
    },
    refus: {
      montant: 0,
      nombre: 0,
    },
    validation: {
      montant: 0,
      nombre: 0,
    },
    annulation: {
      montant: 0,
      nombre: 0,
    },
    hc: {
      montant: 0,
      nombre: 0,
    },
    hb: {
      montant: 0,
      nombre: 0,
    },
  });

  const handleShowList = () => {
    const list = showList;
    setShowList(!list);
  };
  const handleBanqueChange = (e) => {
    const newSelectedBanque = selectedBanque;
    const status = e.target.checked;
    const value = e.target.value;
    if (status) {
      newSelectedBanque.push(value);
      setSelectedBanque(newSelectedBanque);
    } else {
      const index = newSelectedBanque.indexOf(value);
      if (index > -1) {
        newSelectedBanque.splice(index, 1);
      }
      setSelectedBanque(newSelectedBanque);
    }
    getStat(demandes);
  };

  const handleStartDateChange = (date) => {
    const newDate = selectedDate;
    newDate["start"] = date;
    setSelectedDate(newDate);
    getStat(demandes);
    console.log(date);
  };

  const handleEndDateChange = (date) => {
    const newDate = selectedDate;
    newDate["end"] = date;
    setSelectedDate(newDate);
    getStat(demandes);
  };
  const handleCreditChange = (e) => {
    const newSelectedCredit = selectedCredit;
    const status = e.target.checked;
    const value = e.target.value;
    if (status) {
      selectedCredit.push(value);
      setSelectedCredit(newSelectedCredit);
    } else {
      const index = newSelectedCredit.indexOf(value);
      if (index > -1) {
        newSelectedCredit.splice(index, 1);
      }
      setSelectedCredit(newSelectedCredit);
    }
    getStat(demandes);
    console.log(selectedCredit);
  };

  const handleAgentChange = (e) => {
    const newSelectedAgent = selectedAgent;
    const status = e.target.checked;
    const value = e.target.value;
    if (status) {
      newSelectedAgent.push(value);
      setSelectedAgent(newSelectedAgent);
    } else {
      const index = newSelectedAgent.indexOf(value);
      if (index > -1) {
        newSelectedAgent.splice(index, 1);
      }
      setSelectedAgent(newSelectedAgent);
    }
    getStat(demandes);
    console.log(selectedAgent);
  };

  const filterAgents = (demandes) => {
    var filteredList = [];
    if (selectedAgent.length < 1) {
      return [...demandes];
    } else {
      demandes.map((demande) => {
        if (
          selectedAgent.includes(
            demande["prospectInfo"]["agentInfo"]["user_name"]
          )
        ) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    }
  };

  const filterBanques = (demandes) => {
    var filteredList = [];
    if (selectedBanque.length < 1) {
      return [...demandes];
    } else {
      demandes.map((demande) => {
        if (selectedBanque.includes(demande["banque"])) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    }
  };

  const filterCredits = (demandes) => {
    var filteredList = [];
    if (selectedCredit.length < 1) {
      return [...demandes];
    } else {
      demandes.map((demande) => {
        if (selectedCredit.includes(demande["type_credit"])) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    }
  };
  const filterDate = (demandes) => {
    const filteredList = [];
    const start =
      selectedDate["start"] === null ? null : new Date(selectedDate["start"]);
    const end =
      selectedDate["end"] === null ? null : new Date(selectedDate["end"]);
    if (selectedDate["start"] === null && selectedDate["end"] === null) {
      return [...demandes];
    } else if (selectedDate["start"] !== null && selectedDate["end"] !== null) {
      demandes.map((demande) => {
        const demandeDate = new Date(demande["date"]);
        if (demandeDate >= start && demandeDate <= end) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    } else if (selectedDate["start"] !== null && selectedDate["end"] === null) {
      console.log("3");

      demandes.map((demande) => {
        const demandeDate = new Date(demande["date"]);
        if (demandeDate >= start) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    } else {
      console.log("4");

      demandes.map((demande) => {
        const demandeDate = new Date(demande["date"]);
        if (demandeDate <= end) {
          filteredList.push(demande);
        }
      });
      return [...filteredList];
    }
  };

  const filterDateDebloque = (demandes) => {
    const filteredList = [];
    const start =
      selectedDate["start"] === null ? null : new Date(selectedDate["start"]);
    const end =
      selectedDate["end"] === null ? null : new Date(selectedDate["end"]);
    if (selectedDate["start"] === null && selectedDate["end"] === null) {
      return [...demandes];
    } else if (selectedDate["start"] !== null && selectedDate["end"] !== null) {
      demandes.map((demande) => {
        if (demande["date_debloque"] !== null) {
          const demandeDate = new Date(demande["date_debloque"]);
          if (demandeDate >= start && demandeDate <= end) {
            filteredList.push(demande);
          }
        }
      });
      console.log(filteredList);
      return [...filteredList];
      
    } else if (selectedDate["start"] !== null && selectedDate["end"] === null) {
      console.log("3");

      demandes.map((demande) => {
        if (demande["date_debloque"] != null) {
          const demandeDate = new Date(demande["date_debloque"]);
          if (demandeDate >= start) {
            filteredList.push(demande);
          }
        }
      });
      console.log(filteredList);
      return [...filteredList];
    } else {
      console.log("4");

      demandes.map((demande) => {
        if (demande["date_debloque"] != null) {
          const demandeDate = new Date(demande["date_debloque"]);
          if (demandeDate <= end) {
            filteredList.push(demande);
          }
        }
      });

      return [...filteredList];
    }
  };

  const getStat = (demandes) => {
    
    //normal filter
    const filteredDate = filterDate(demandes);
    const filteredAgents = filterAgents([...filteredDate]);
    const filteredCredits = filterCredits([...filteredAgents]);
    const filteredBanques = filterBanques([...filteredCredits]);

    //filter base on debloque
    const filteredDateDebloque = filterDateDebloque(demandes);
    const filteredDebloqueAgents = filterAgents([...filteredDateDebloque]);
    const filteredDebloqueCredits = filterCredits([...filteredDebloqueAgents]);
    const filteredDebloqueBanques = filterBanques([...filteredDebloqueCredits]);
    

    const newStat = {
      debloque: getMontantDebloque(filteredDebloqueBanques),
      demande: getMontantDemande(filteredBanques),
      accord: getMontantAccorde(filteredBanques),
      refus: getMontantRefuse(filteredBanques),
      validation: getMontantValide(filteredBanques),
      annulation: getMontantAnnule(filteredBanques),
      hc: getHc(filteredDebloqueBanques),
      hb: getHb(filteredDebloqueBanques),
    };
    setStat(newStat);
    setFilteredList(filteredBanques);
    setFactureList(filteredDebloqueBanques)
  };

 

  const getFacture = async(demandes) => {
    if (selectedBanque.length !== 1 || selectedDate.start === null || selectedDate.end === null){
      toast({
        title: `Veuillez sélectionner une banque et une plage de dates`,
        status: "error",
        isClosable: true,
        duration: 1500,
      });
      return
    }
    const dates = {
      "start" : new Date(selectedDate.start).toLocaleString("en-GB").split(",")[0],
      "end" : new Date(selectedDate.end).toLocaleString("en-GB").split(",")[0],
    }
   const obj = {...dates,"bank":selectedBanque[0], "timestamp":new Date().getTime()}
     await axiosInstance.get("credits/download/facture", {responseType:"arraybuffer",params:obj})
     .then((response)=>{
      const blob = new Blob([response.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      const fileName = "facture_"+selectedBanque[0]+"_"+dates.start+"-"+dates.end+".xlsx"
      FileSaver.saveAs(blob, fileName)
     })
    
  };

  const getExportData = (demandes) => {
    const exportData = [];
    demandes.map((demande) => {
      var exportDemande = {
        nom: demande["prospectInfo"]["nom"],
        prenom: demande["prospectInfo"]["prenom"],
        montant: changeStringToFloat(demande["montant"]),
        montant_valide:
          demande["montant_valide"] !== ""
            ? changeStringToFloat(demande["montant_valide"])
            : "",
        montant_debloque:
          demande["montant_debloque"] !== ""
            ? changeStringToFloat(demande["montant_debloque"])
            : "",
        status: demande["statusCredit"],
        banque: demande["banque"],
        hc: demande["hc"],
        hb: demande["hb"],
      };
      exportData.push(exportDemande);
    });
    console.log(exportData);
    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      origin: "A2",
      skipHeader: true,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(worksheet, headers);
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet 1");
    const fileName = "credit_" + selectedBanque.join("-") + "-" + selectedCredit.join("-") + ".xlsx"
    XLSX.writeFile(workbook, fileName);
  };

  const getMontantDebloque = (demandes) => {
    var montantDebloque = 0;
    var nombre = 0;
    demandes.map((demande) => {
      if (demande["montant_debloque"] !== "") {
        montantDebloque =
          montantDebloque + changeStringToFloat(demande["montant_debloque"]);
        nombre++;
      }
    });

    return {
      montant: montantDebloque,
      nombre: nombre,
    };
  };

  const getHc = (demandes) => {
    var montant = 0;
    var nombre = 0;

    demandes.map((demande) => {
      if (
        (demande["statusCredit"] === status[8] ||
          demande["statusCredit"] === status[9]) &&
        demande["status_honnaires"]["hc"]
      ) {
        montant = montant + changeStringToFloat(demande["hc"]);
        nombre++;
      }
    });

    return {
      montant: montant,
      nombre: nombre,
    };
  };

  const getHb = (demandes) => {
    var montant = 0;
    var nombre = 0;

    demandes.map((demande) => {
      if (
        demande["statusCredit"] === status[9] &&
        demande["status_honnaires"]["hb"]
      ) {
        montant = montant + changeStringToFloat(demande["hb"]);
        nombre++;
      }
    });

    return {
      montant: montant,
      nombre: nombre,
    };
  };

  const getMontantAccorde = (demandes) => {
    var montantAccorde = 0;
    var nombre = 0;
    demandes.map((demande) => {
      if (demande["statusCredit"] === status[3]) {
        montantAccorde =
          montantAccorde + changeStringToFloat(demande["montant"]);
        nombre++;
      }
    });

    return {
      montant: montantAccorde,
      nombre: nombre,
    };
  };

  const getMontantRefuse = (demandes) => {
    var montantRefuse = 0;
    var nombre = 0;
    demandes.map((demande) => {
      if (demande["statusCredit"] === status[6]) {
        montantRefuse = montantRefuse + changeStringToFloat(demande["montant"]);
        nombre++;
      }
    });

    return {
      montant: montantRefuse,
      nombre: nombre,
    };
  };

  const getMontantAnnule = (demandes) => {
    var montantAnnule = 0;
    var nombre = 0;
    demandes.map((demande) => {
      if (demande["statusCredit"] === status[5]) {
        montantAnnule = montantAnnule + changeStringToFloat(demande["montant"]);
        nombre++;
      }
    });

    return {
      montant: montantAnnule,
      nombre: nombre,
    };
  };

  const getMontantValide = (demandes) => {
    var montantValide = 0;
    var nombre = 0;
    demandes.map((demande) => {
      if (demande["statusCredit"] === status[8]) {
        montantValide = montantValide + changeStringToFloat(demande["montant"]);
        nombre++;
      }
    });

    return {
      montant: montantValide,
      nombre: nombre,
    };
  };

  const getMontantDemande = (filteredList) => {
    var montant = 0;
    var nombre = 0;
    if (filteredList.length > 0) {
      filteredList.map((demande) => {
        montant = montant + changeStringToFloat(demande["montant"]);
        nombre++;
      });
    }
    return {
      montant: montant,
      nombre: nombre,
    };
  };

  const handleCommissionDataChange = (event) => {
    var fieldName = event.target.getAttribute("name");

    var fieldValue = event.target.value;
    const newCommissionData = { ...commissionData };
    newCommissionData[fieldName] = fieldValue;

    setCommissionData(newCommissionData);
    console.log(newCommissionData);
  };

  const updateCommissionData = () => {
    console.log("submitting commission data");
    console.log(commissionData);
  };

  const calculateCommission = () => {
    const newAgentCommission = { ...agentCommission };

    newAgentCommission.objectif_totale =
      parseFloat(commissionData.objectif_honoraire) +
      parseFloat(commissionData.objectif_deblocage) * 0.0166;

    newAgentCommission.realisation =
      stat.hc.montant + stat.debloque.montant * 0.0166;

    newAgentCommission.taux_realisation =
      (newAgentCommission.realisation / newAgentCommission.objectif_totale) *
      100;

    if (newAgentCommission.taux_realisation > 100) {
      newAgentCommission.commission =
        (newAgentCommission.realisation *
          parseFloat(commissionData.taux_objectif)) /
        100;
    } else if (
      newAgentCommission.taux_realisation >= 84 &&
      newAgentCommission.taux_realisation < 100
    ) {
      newAgentCommission.commission = 350;
    } else {
      newAgentCommission.commission = 0;
    }
    console.log(newAgentCommission);
    setAgentCommission(newAgentCommission);
  };

  useEffect(() => {
    getStat(demandes);
    console.log(agentCommission);
  }, [agentCommission, demandes]);

  return (
    <Grid
      mt={4}
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={2}
      row
    >
      <GridItem rowSpan={4} colSpan={1}>
        <VStack alignItems={"flex-start"} spacing={10}>
          <HStack>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <VStack>
                <InputGroup>
                  <DatePicker
                    id="customDatePicker"
                    name="start"
                    showMonthDropdown
                    showYearDropdown
                    selected={selectedDate["start"]}
                    dropdownMode="select"
                    onChange={handleStartDateChange}
                    isClearable={true}
                    placeholderText="debut"
                    dateFormat={"dd/MM/yyyy"}
                    portalId="root-portal"
                  />
                </InputGroup>
                <Text>à</Text>
                <InputGroup>
                  <DatePicker
                    id="customDatePicker"
                    name="end"
                    showMonthDropdown
                    selected={selectedDate["end"]}
                    showYearDropdown
                    minDate={selectedDate["start"]}
                    placeholderText="fin"
                    dropdownMode="select"
                    onChange={handleEndDateChange}
                    isClearable
                    dateFormat={"dd/MM/yyyy"}
                    portalId="root-portal"
                  />
                </InputGroup>
              </VStack>
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>Type de Credit</FormLabel>
              <CheckboxGroup colorScheme="orange">
                <Stack spacing={[1, 1]} direction={"column"}>
                  <Checkbox
                    onChange={handleCreditChange}
                    value={"consommation"}
                    size={"sm"}
                  >
                    Consommation
                  </Checkbox>
                  <Checkbox
                    onChange={handleCreditChange}
                    value={"hypothecaire"}
                    size={"sm"}
                  >
                    Hypothécaire
                  </Checkbox>
                  <Checkbox
                    onChange={handleCreditChange}
                    value={"immobilier"}
                    size={"sm"}
                  >
                    Immobilier
                  </Checkbox>
                  <Checkbox
                    onChange={handleCreditChange}
                    value={"participatif"}
                    size={"sm"}
                  >
                    Participatif
                  </Checkbox>
                  <Checkbox
                    onChange={handleCreditChange}
                    value={"leasing"}
                    size={"sm"}
                  >
                    Leasing
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>Banques</FormLabel>
              <CheckboxGroup colorScheme="orange">
                <Stack spacing={[1, 1]} direction={"column"}>
                  {banqueList.map((banque, index) => (
                    <Checkbox
                      size={"sm"}
                      onChange={handleBanqueChange}
                      value={banque}
                      key={banque}
                    >
                      {banque}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </HStack>
          {user["role"] !== "Agent" && (
            <HStack>
              <FormControl>
                <FormLabel>Agents</FormLabel>
                <CheckboxGroup colorScheme="orange">
                  <Stack spacing={[1, 1]} direction={"column"}>
                    {users.map((user, index) => (
                      <Checkbox
                        size={"sm"}
                        value={user["user_name"]}
                        key={user["user_name"]}
                        onChange={handleAgentChange}
                      >
                        {user["user_name"]}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>
            </HStack>
          )}
          <Divider orientation="vertical" />
        </VStack>
      </GridItem>

      <GridItem colSpan={"4"}>
        <form>
          <Card variant={"filled"} align={"center"} m={1}>
            <HStack align={"flex-start"} spacing={1} w={"70%"} mb={1} mt={2}>
              <VStack align={"flex-start"} w="50%" my={1}>
                <FormControl isRequired={true} my={1}>
                  <FormLabel fontSize={"sm"} fontWeight="normal">
                    Objectif Honnaire
                  </FormLabel>
                  <Input
                    variant={"flushed"}
                    size="xs"
                    name="objectif_honoraire"
                    _placeholder={""}
                    value={commissionData.objectif_honoraire}
                    type="text"
                    disabled={user.role === "Agent"}
                    onChange={handleCommissionDataChange}
                  />
                </FormControl>
                <FormControl my={1} isRequired>
                  <FormLabel fontSize={"sm"} fontWeight="normal">
                    Objectif déblocage
                  </FormLabel>
                  <Input
                    name="objectif_deblocage"
                    size="xs"
                    variant={"flushed"}
                    _placeholder={{ color: "gray.500" }}
                    value={commissionData.objectif_deblocage}
                    type="text"
                    disabled={user.role === "Agent"}
                    onChange={handleCommissionDataChange}
                  />
                </FormControl>
                <FormControl my={1} isRequired>
                  <FormLabel fontSize={"sm"} fontWeight="normal">
                    Taux Objectif %
                  </FormLabel>
                  <Input
                    name="taux_objectif"
                    size="xs"
                    variant={"flushed"}
                    _placeholder={{ color: "gray.500" }}
                    value={commissionData.taux_objectif}
                    type="text"
                    disabled={user.role === "Agent"}
                    onChange={handleCommissionDataChange}
                  />
                </FormControl>
              </VStack>
              <VStack align={"start"} spacing={5} w="50%" my={1}>
                <Text fontWeight={"bold"}>
                  Objectif totale :{" "}
                  <CurrencyFormat
                    displayType="text"
                    value={agentCommission["objectif_totale"]}
                    decimalSeparator=","
                    thousandSeparator=" "
                    decimalScale={2}
                    suffix="  MAD"
                    isNumericString
                    fixedDecimalScale={true}
                  ></CurrencyFormat>
                </Text>
                <Text fontWeight={"bold"}>
                  Taux de Réalisation :{" "}
                  <CurrencyFormat
                    displayType="text"
                    value={agentCommission["taux_realisation"]}
                    decimalSeparator="."
                    decimalScale={2}
                    suffix="  %"
                    isNumericString
                    fixedDecimalScale={true}
                  ></CurrencyFormat>
                </Text>
                {user["role"] !== "Agent" && (
                  <Button
                    size={"xs"}
                    colorScheme={"orange"}
                    onClick={updateCommissionData}
                  >
                    Mettre à jour
                  </Button>
                )}
              </VStack>
              <VStack align={"start"} spacing={5} w="50%" my={1}>
                <Text fontWeight={"bold"}>
                  Réalisation:{" "}
                  <CurrencyFormat
                    displayType="text"
                    value={agentCommission["realisation"]}
                    decimalSeparator=","
                    thousandSeparator=" "
                    decimalScale={2}
                    suffix="  MAD"
                    isNumericString
                    fixedDecimalScale={true}
                  ></CurrencyFormat>
                </Text>
                <Text fontWeight={"bold"}>
                  Commission :{" "}
                  <CurrencyFormat
                    displayType="text"
                    value={agentCommission["commission"]}
                    decimalSeparator=","
                    thousandSeparator=" "
                    decimalScale={2}
                    suffix="  MAD"
                    isNumericString
                    fixedDecimalScale={true}
                  ></CurrencyFormat>
                </Text>
                <Button
                  onClick={calculateCommission}
                  size={"xs"}
                  colorScheme={"blue"}
                >
                  Calculer
                </Button>
              </VStack>
            </HStack>
          </Card>
        </form>
        <Flex flexDir="column">
          <StatGroup justifyContent={"space-between"}>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "orange.100" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel mb={2} fontSize={"xl"}>
                Déblocage
              </StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={stat["debloque"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  suffix=" MAD"
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdOutlineRuleFolder size={"20"} />
                Demandes Débloquées: {stat["debloque"]["nombre"]}
              </StatHelpText>
            </Stat>

            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "orange.100" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel mb={2} fontSize={"xl"}>
                Demandes
              </StatLabel>
              <StatNumber>
                {" "}
                <CurrencyFormat
                  displayType="text"
                  value={stat["demande"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdOutlineRuleFolder size={"20"} />
                Demandes Créés: {stat["demande"]["nombre"]}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
        <Flex flexDir="column">
          <StatGroup alignContent={"flex-start"}>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Accords</StatLabel>
              <StatNumber>
                {" "}
                <CurrencyFormat
                  displayType="text"
                  value={stat["accord"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <AiOutlineFileDone size={"20"} />
                Demandes Accordées: {stat["accord"]["nombre"]}
              </StatHelpText>
            </Stat>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Refus</StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={stat["refus"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdBlock size={"20"} />
                Demandes Refusées: {stat["refus"]["nombre"]}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
        <Flex flexDir="column">
          <StatGroup alignContent={"flex-start"}>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Validation</StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={stat["validation"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdCheckCircleOutline size={"20"} />
                Demandes Validées: {stat["validation"]["nombre"]}
              </StatHelpText>
            </Stat>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Annulation</StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={stat["annulation"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdOutlineCancel size={"20"} />
                Demandes Annulées: {stat["annulation"]["nombre"]}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
        <Flex flexDir="column">
          <StatGroup alignContent={"flex-start"}>
            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Honnaires Clients</StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={stat["hc"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdPayments size={"20"} />
                Demandes : {stat["hc"]["nombre"]}
              </StatHelpText>
            </Stat>

            <Stat
              p={2}
              borderRadius="10px"
              m="2"
              bgColor={colorMode == "light" ? "" : "#ffffff"}
              color="black"
              boxShadow="0 4px 12px 0 rgba(0, 0, 0, 8%)"
            >
              <StatLabel>Honnaires Banques</StatLabel>
              <StatNumber>
                <CurrencyFormat
                  displayType="text"
                  value={user["role"] === "Agent" ? "0" : stat["hb"]["montant"]}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  suffix="  MAD"
                  fixedDecimalScale={true}
                />
              </StatNumber>
              <StatHelpText>
                <MdOtherHouses size={"20"} />
                Demandes : {stat["hb"]["nombre"]}
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Flex>
        <Container centerContent mt={6}>
          <HStack>
            <Button
              onClick={handleShowList}
              leftIcon={<AiOutlineUnorderedList />}
              bgColor={colorMode == "light" ? "orange.100" : "#ffffff"}
            >
              Lister
            </Button>
            {user["role"] !== "Agent" && (
              <>
                <Button
                  isDisabled={factureList.length > 0 ? false : true}
                  bgColor={colorMode == "light" ? "orange.100" : "#ffffff"}
                  onClick={() => getFacture(factureList)}
                
                >
                  Facture
                  <MdOutlineInsertDriveFile />
                </Button>
                <Button
                  isDisabled={filteredList.length > 0 ? false : true}
                  bgColor={colorMode == "light" ? "orange.100" : "#ffffff"}
                  onClick={() => getExportData(filteredList)}
                >
                  Exporter
                  <AiOutlineExport />
                </Button>
              </>
            )}
          </HStack>
        </Container>
        {showList && (
          <>
            {filteredList.length > 0 ? (
              <TableContainer
                m={2}
                mt={6}
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
                        No.
                      </Th>
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
                        HC
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
                            {index + 1}
                          </Td>
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
                            {demande.montant}
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
                            {demande.banque}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande.hc}
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
                              {user["role"] === "Agent"
                                ? "#######"
                                : demande["hb"]}
                            </Td>
                          )}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Stack>
                <Code mt={2}>Aucun Enregistrement Trouvé</Code>
              </Stack>
            )}
          </>
        )}
      </GridItem>
    </Grid>
  );
};

export default Panel;
