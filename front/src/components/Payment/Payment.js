import React, { useState } from 'react';
import '../Payment/Payment.css';

const Payment = ({ deletedItem }) => {
  const [saida, setSaida] = useState('');
  const [valor, setValor] = useState(0);

  const handleCal = () => {
    const entrada = parseFloat(deletedItem.entrada);
    const saidaValue = parseFloat(saida);
    const calhora = saidaValue - entrada;
    let valorFinal = 0

    //se o cliente for horista
    if (!isNaN(entrada) && !isNaN(saidaValue) && deletedItem.tipocli === 1) {

      //se for carro
      if(deletedItem.tipo === 1){
        for(let i=0; i<calhora; i++){
        valorFinal = valorFinal + 15 
          }
        setValor(valorFinal)
      }
      // se for moto
      if(deletedItem.tipo === 2){
        for(let i=0; i<calhora; i++){
        valorFinal = valorFinal + 10 
          }
        setValor(valorFinal)
      }
 
          
        }
    //cliente diaria
    if (!isNaN(entrada) && !isNaN(saidaValue) && deletedItem.tipocli === 2) {
      if(deletedItem.tipo === 1){
        setValor(70)
      }
      if(deletedItem.tipo === 2){
        setValor(50)
      }
        
      }
      //se o cliente for mensalista
    if (!isNaN(entrada) && !isNaN(saidaValue) && deletedItem.tipocli === 3) {
      if(deletedItem.tipo === 1){
        setValor(200)
      }
      if(deletedItem.tipo === 1){
        setValor(150)
      }
      }  
    }
    

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
      <label>Tipo Clien</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.tipocli || ''} />
      )}
      <label>Entrada</label>
      {deletedItem && (
        <textarea readOnly value={deletedItem.entrada || ''} />
      )}
      <label>Saída</label>
      <input onChange={(e) => setSaida(e.target.value)} />
  
      <label>Valor a ser pago</label>
      <p>R${valor}.00</p>
      <button onClick={handleCal}>Calcular</button>
    </div>
  );
};

export default Payment;