import React, { useState } from 'react';
import '../Payment/Payment.css';

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
    <div className='main-payment'>
      <h3>Pagamento</h3>
      <label>Descrição</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.descricao || ''} />
      )}
      <label>Placa</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.placa || ''} />
      )}
      <label>Tipo</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.tipo || ''} />
      )}
      <label>Tipo Cliente</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.tipocli || ''} />
      )}
      <label>Entrada</label>
      {deletedItem && (
        <input readOnly value={deletedItem.entrada || ''} />
      )}
      <label>Saída</label>
      <input type="datetime-local" onChange={(e) => setSaida(e.target.value)} />

      <label>Valor a ser pago</label>
      <p>R${valor.toFixed(2)}</p>
      <button onClick={handleCal}>Calcular</button>
      <button onClick={()=>{window.location.reload()}}>Gerar Boleto</button>  
    </div>
  );
};

export default Payment;