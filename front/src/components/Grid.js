import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaCalculator, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ({ users, setUsers, setOnEdit, setDeletedItem, openPaymentModal, setShouldRemoveItem }) => {
  const handleEdit = (item) => {
    console.log("Editando item:", item);
    setOnEdit(item);
  };

  const handleDelete = async (item) => {
    try {
      setDeletedItem(item);
      openPaymentModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Placa</Th>
          <Th>Descrição</Th>
          <Th>Entrada</Th>
          <Th>Tipo</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.placa}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td width="23%">{item.entrada}</Td>
            <Td width="7%">{item.tipo}</Td>
            <Td alignCenter width="6%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="6%">
              <FaCalculator onClick={() => handleDelete(item)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;