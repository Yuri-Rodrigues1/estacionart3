import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Historico() {
    const [historico, setHistorico] = useState([]);
    useEffect(() => {
        // Faça uma solicitação para obter o histórico do backend
        axios.get('http://localhost:3000/historico')
            .then((response) => {
                setHistorico(response.data);
            })
            .catch((error) => {
                console.error('Erro ao obter o histórico:', error);
            });
    }, []);

    return (
        <div>
            <h2>Histórico de Veículos Removidos</h2>
            <ul>
                {historico.map((item) => (
                    <li key={item.id}>
                        <p>Id: {item.id}</p>
                        <p>Descrição: {item.descricao}</p>
                        <p>entrada: {item.entrada}</p>
                        <p>tipo: {item.tipo}</p>
                        <p>tipo cliente: {item.tipocli}</p>
                        <p>saida: {item.data_saida}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Historico;