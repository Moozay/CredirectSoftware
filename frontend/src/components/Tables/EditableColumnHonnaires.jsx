import React, { useState, useEffect,useContext } from "react";
import {
  Input,
  Tr,
  Td,
  Checkbox,
  IconButton,
  Select,
  InputGroup,
  InputLeftElement,
  Box,
  FormControl,
} from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";

// React icons
import {
  MdOutlineCancel,
  MdAdminPanelSettings,
  MdOutlineEmail,
  MdOtherHouses,
} from "react-icons/md";
import { VscSymbolNamespace } from "react-icons/vsc";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { UserContext } from "context/UserContext";

const EditableColumn = ({
  editCreditForm,
  handleEditCreditChange,
  handleEditFormSubmit,
  handleCancel,
}) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <Td
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        <FormControl>
          <InputGroup size="sm">
            <CurrencyFormat
              customInput={Input}
              isNumericString
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              name="hc"
              value={editCreditForm.hc}
              onChange={handleEditCreditChange}
              placeholder="# ### ###.##"
            />
          </InputGroup>
        </FormControl>
      </Td>
      {user["role"] !== "Agent" && (
        <Td style={{ padding: 2 }} textAlign="center">
          <Checkbox
            name={"hb"}
            size="lg"
            colorScheme="orange"
            isChecked={editCreditForm["status_honnaires"]["hb"]}
            onChange={handleEditCreditChange}
            p={1}
          />
        </Td>
      )}

      <Td style={{ padding: 2 }} textAlign="center">
        <Checkbox
          name={"hc"}
          size="lg"
          colorScheme="orange"
          isChecked={editCreditForm["status_honnaires"]["hc"]}
          onChange={handleEditCreditChange}
          p={1}
        />
      </Td>
      <Td style={{ padding: 2 }} textAlign="center">
        <IconButton
          variant="outline"
          color="blue.400"
          aria-label="Call Sage"
          fontSize="15px"
          m={0.4}
          size="xs"
          icon={<BsCheck />}
          onClick={handleEditFormSubmit}
        />
        <IconButton
          variant="outline"
          color="orange.400"
          aria-label="Call Sage"
          fontSize="15px"
          m={0.4}
          size="xs"
          icon={<MdOutlineCancel />}
          onClick={handleCancel}
          type="submit"
        />
      </Td>
    </>
  );
};

export default EditableColumn;
