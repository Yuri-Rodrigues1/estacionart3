import React, { useState } from 'react';
import '../Payment/Payment.css';

const Payment = ({ deletedItem }) => {
  const [saida, setSaida] = useState('');
  const [valor, setValor] = useState(0);

  const handleCal = () => {
    const entrada = parseFloat(deletedItem.entrada);
    const saidaValue = parseFloat(saida);

    if (!isNaN(entrada) && !isNaN(saidaValue) && deletedItem.tipocli === 1) {
      const calhora = saidaValue - entrada;
      setValor(calhora);
    }
  }

  return (
    <div className='main-payment'>
      <label>Descrição</label>
      {deletedItem && (
        <textarea value={deletedItem.descricao || ''} />
      )}
      <label>Placa</label>
      {deletedItem && (
        <textarea value={deletedItem.placa || ''} />
      )}
      <label>Tipo</label>
      {deletedItem && (
        <textarea value={deletedItem.tipo || ''} />
      )}
      <label>Tipo Clien</label>
      {deletedItem && (
        <textarea value={deletedItem.tipocli || ''} />
      )}
      <label>Entrada</label>
      {deletedItem && (
        <textarea value={deletedItem.entrada || ''} />
      )}
      <label>Saída</label>
      <input onChange={(e) => setSaida(e.target.value)} />
      <div>
        <select>
          <option value="">Tipo Vei...</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <select>
          <option value="">Tipo Cli...</option>
          <option value="1">Hora</option>
          <option value="2">Diaria</option>
          <option value="3">Mensalista</option>
        </select>
      </div>
      <label>Valor a ser pago</label>
      <textarea value={valor} />
      <button onClick={handleCal}>Calcular</button>
    </div>
  );
};

export default Payment;