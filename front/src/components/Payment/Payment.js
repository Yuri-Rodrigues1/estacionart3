import React, { useState } from 'react';
import '../Payment/Payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = ({ deletedItem }) => {
  const [saida, setSaida] = useState('');
  const [valor, setValor] = useState(0);

  const handleCal = () => {
    const entrada = new Date(deletedItem.entrada);
    const saidaValue = new Date(saida);
    const timeDifference = (saidaValue - entrada) / (1000 * 60 * 60); // fazer o calculo da diferença em horas

    let valorFinal = 0;

    if (timeDifference >= 1) {
      // verificando o tipo do cliente 
      if(deletedItem.tipocli === 1){
        // verificando o tipo do veículo
        if (deletedItem.tipo === 1) {
          valorFinal = timeDifference * 15;
        } else if (deletedItem.tipo === 2) {
          valorFinal = timeDifference * 20;
        }
      }
    }else if(deletedItem.tipocli === 2){
      if (deletedItem.tipo === 1) {
        valorFinal = 50;
      } else if (deletedItem.tipo === 2) {
        valorFinal = 75
      }
    }else if(deletedItem.tipocli === 3){
      if (deletedItem.tipo === 1) {
        valorFinal = 200
      } else if (deletedItem.tipo === 2) {
        valorFinal = 250
      }
    } 
    setValor(valorFinal);
  };

  return (
    <div className="container main-payment">
    <h3>Pagamento</h3>
    <div className="form-group">
      <label>Descrição</label>
      {deletedItem && (
        <textarea className="form-control" readOnly value={deletedItem.descricao || ''} />
      )}
    </div>
    <div className="form-group">
      <label>Placa</label>
      {deletedItem && (
        <textarea className="form-control" readOnly value={deletedItem.placa || ''} />
      )}
    </div>
    <div className="form-group">
      <label>Tipo</label>
      {deletedItem && (
        <textarea className="form-control" readOnly value={deletedItem.tipo || ''} />
      )}
    </div>
    <div className="form-group">
      <label>Tipo Cliente</label>
      {deletedItem && (
        <textarea className="form-control" readOnly value={deletedItem.tipocli || ''} />
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
      <input className="form-control-saida" type="datetime-local" onChange={(e) => setSaida(e.target.value)} />
    </div>
    <div className="form-group">
      <label>Valor a ser pago</label>
      <p className="form-control-static">R${valor.toFixed(2)}</p>
    </div>
    <button className="btn btn-primary" onClick={handleCal}>Calcular</button>
    <button className="btn btn-secondary" onClick={() => { window.location.reload() }}>Gerar Boleto</button>
  </div>
  );
};

export default Payment;