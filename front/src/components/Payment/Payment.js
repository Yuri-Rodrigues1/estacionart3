import React, { useState } from 'react';
import '../Payment/Payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = ({ deletedItem }) => {
  const [saida, setSaida] = useState('');
  const [valor, setValor] = useState(0);

  const handleCal = () => {
    const entrada = new Date(deletedItem.entrada);
    const saidaValue = new Date(saida);
    const timeDifference = (saidaValue - entrada) / (1000 * 60 * 60); // calcular a diferença em horas

    let valorFinal = 0;

    if (timeDifference >= 1) {
      if (deletedItem.tipocli === 1) {
        // Cliente horista
        const minutosUsados = timeDifference * 60;
        
        // Cada 15 minutos custa R$ 5
        const valorPor15Min = 5;
        const valorPorHora = 20;

        valorFinal = Math.ceil(minutosUsados / 15) * valorPor15Min;
        valorFinal += Math.floor(timeDifference) * valorPorHora;
      } else if (deletedItem.tipocli === 2) {
        // Cliente diária
        const valorPorDia = 50;
        valorFinal = Math.ceil(timeDifference / 24) * valorPorDia;
      } else if (deletedItem.tipocli === 3) {
        // Cliente mensalista
        const valorPadrao = 250;
        valorFinal = valorPadrao;
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
        <input className="form-control" type="datetime-local" onChange={(e) => setSaida(e.target.value)} />
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