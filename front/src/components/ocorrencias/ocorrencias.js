import { toast, ToastContainer } from "react-toastify";
import Form from "./Ocomponents/FormOcorrencia";
import Grid from "./Ocomponents/GridOcorrencia";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Ocorrencias.css"

function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getOcorrencias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/ocorrencias");
      setOcorrencias(res.data.sort((a, b) => (a.data > b.data ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getOcorrencias();
  }, []); // Remover a dependência de setUsers

  return (
    <>
      <div>
        <h3>Ocorrências</h3>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getOcorrencias={getOcorrencias} />
        <Grid ocorrencias={ocorrencias} setOcorrencias={setOcorrencias} setOnEdit={setOnEdit} />
      </div>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default Ocorrencias;