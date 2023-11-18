import React, { useState, useEffect } from 'react';
import '../Payment/Payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Payment = ({ deletedItem, shouldRemoveItem, setShouldRemoveItem }) => {
  const [saida, setSaida] = useState('');
  const [valor, setValor] = useState(0);

  useEffect(() => {
  
    if (shouldRemoveItem) {
  
      setShouldRemoveItem(false);
    }
  }, [shouldRemoveItem, setShouldRemoveItem]);

  const handleCal = () => {
    const entrada = new Date(deletedItem.entrada);
    const saidaValue = new Date(saida);
    const timeDifference = (saidaValue - entrada) / (1000 * 60 * 60); // calcular a diferença em horas
  
    let valorFinal = 0;
  
    if (timeDifference >= 1) {
      const valorPorHoraCarro = 10;
      const valorPorHoraMoto = 6;
      const minutosUsados = Math.ceil(timeDifference * 60);
      if (deletedItem.tipocli === 1) {
        // Cliente horista
        if(deletedItem.tipo === 1){
          valorFinal = (Math.ceil(minutosUsados / 60) * valorPorHoraMoto)-6;
        }
        else if(deletedItem.tipo === 2){
          valorFinal = (Math.ceil(minutosUsados / 60) * valorPorHoraCarro)-10;
        }
        
      } else if (deletedItem.tipocli === 2) {
        // Cliente diária
        const valorPorDiaCarro = 35;
        const valorPorDiaMoto = 25;
        

        if(deletedItem.tipo === 1){
          if (Math.ceil(timeDifference / 24) > 0) {
            valorFinal = Math.ceil(timeDifference / 24) * valorPorDiaMoto;
          }
        }
        else if(deletedItem.tipo === 2){
          if (Math.ceil(timeDifference / 24) > 0) {
            valorFinal = Math.ceil(timeDifference / 24) * valorPorDiaCarro;
          }
        }
       

      } else if (deletedItem.tipocli === 3) {
        // Cliente mensalista
        const valorPorMesCarro = 250;
        const valorPorMesMoto = 150;

        if((Math.ceil(timeDifference / (24 * 30))) === 1){
          if(deletedItem.tipo === 1){
            valorFinal = 150
          }else{
            valorFinal = 250
          }
        }

        if(deletedItem.tipo === 1){
          valorFinal = (Math.ceil(timeDifference / (24 * 30)) * valorPorMesMoto);
        }
        else if(deletedItem.tipo === 2){
          valorFinal = (Math.ceil(timeDifference / (24 * 30)) * valorPorMesCarro);
        }
      
      }
    }
  
    setValor(valorFinal);
  };

  const handleGenerateBoleto = async () => {
    try {
  
      if (deletedItem) {
        await axios.delete(`http://localhost:3000/${deletedItem.idVei}`);
        setShouldRemoveItem(true); 
        window.location.reload()
      }
    } catch (error) {
      console.error("Erro ao gerar boleto ou excluir item:", error);
    }
  };

  return (
    <div className="container main-payment">
      <h3>Pagamento</h3>
      <div className="form-group">
        <label>Descrição</label>
        {deletedItem && (
          <input className="form-control" readOnly value={deletedItem.descricao || ''} />
        )}
      </div>
      <div className="form-group">
        <label>Placa</label>
        {deletedItem && (
          <input className="form-control" readOnly value={deletedItem.placa || ''} />
        )}
      </div>
      <div className="form-group">
        <label>Tipo</label>
        {deletedItem && (
          <input className="form-control" readOnly value={deletedItem.tipo || ''} />
        )}
      </div>
      <div className="form-group">
        <label>Tipo Cliente</label>
        {deletedItem && (
          <input className="form-control" readOnly value={deletedItem.tipocli || ''} />
        )}
      </div>
      <div className="form-group">
        <label>Entrada</label>
        {deletedItem && (
          <input className="form-control" readOnly value={deletedItem.entrada || ''} />
        )}
      </div>
      <div className="form-group">
        <label>Saída</label>
        <input className="form-control" type="datetime-local" onChange={(e) => setSaida(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Valor a ser pago</label>
        <p className="form-control-static">R${valor.toFixed(2)}</p>
      </div>
      <button className="btn btn-primary" onClick={handleCal}>Calcular</button>
      {deletedItem && (
        <button className="btn btn-secondary" onClick={handleGenerateBoleto}>
          Gerar Boleto
        </button>
      )}
    </div>
  );
};

export default Payment;
 