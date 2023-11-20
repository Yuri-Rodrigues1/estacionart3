import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Historico.css"
import Navbar from '../navbar/Navbar';

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
        <>
        <Navbar />
        <div className='main-hist'>
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
                        <td>{item.entrada}</td>
                        <td>{item.tipo}</td>
                        <td>{item.tipocli}</td>
                        <td>{item.data_saida}</td>
                    </tr>
                ))}
<<<<<<< HEAD:front/src/components/historico.js/Historico.js
                </tbody>
            </table>
        </div>
=======
            </ul>
        </div></>
>>>>>>> faf9855c5d30a5c7b9c746faaf461895b7bb5eed:front/src/components/historico/Historico.js
    );
}

export default Historico;