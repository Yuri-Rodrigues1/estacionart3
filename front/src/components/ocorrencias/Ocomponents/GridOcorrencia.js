import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
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

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;



const GridOcorrencia = ({ ocorrencias, setOcorrencias, setOnEdit }) => {
  const handleEdit = (item) => {
    console.log(item);
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/ocorrencias/${id}`);
      const newArray = ocorrencias.filter((ocorrencia) => ocorrencia.id !== id);
      console.log(id)
      setOcorrencias(newArray);
      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Data da Ocorrência</Th>
          <Th>Observação</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>

      <Tbody>
        {ocorrencias.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{new Date(item.data).toLocaleDateString()}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridOcorrencia;