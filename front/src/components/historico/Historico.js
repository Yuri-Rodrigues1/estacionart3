import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Historico.css";
import Navbar from "../navbar/Navbar";
import InputMask from 'react-input-mask';
import { format } from 'date-fns';

function Historico() {
  const [historico, setHistorico] = useState([]);
  useEffect(() => {
    // Faça uma solicitação para obter o histórico do backend
    axios
      .get("http://localhost:3000/historico")
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter o histórico:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-hist">
        <h2>Histórico</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Descrição</th>
              <th>Entrada</th>
              <th>Tipo</th>
              <th>Tipo cliente</th>
              <th>saida</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.descricao}</td>
                <td width="23%">
                  <InputMask
                    style={{ border: "none" }}
                    mask="99-99-9999  99:99"
                    placeholder="YYYY-MM-DDTHH:mm"
                    value={format(new Date(item.entrada), "dd-MM-yyyy'T'HH:mm")}
                    readOnly
                  />
                </td>
                <td>{item.tipo}</td>
                <td>{item.tipocli}</td>
                <td width="23%">
                  <InputMask
                    style={{ border: "none" }}
                    mask="99-99-9999  99:99"
                    placeholder="YYYY-MM-DDTHH:mm"
                    value={format(new Date(item.data_saida), "dd-MM-yyyy'T'HH:mm")}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Historico;
