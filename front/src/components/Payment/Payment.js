import React from 'react'
import '../Payment/Payment.css'

export default function Payment() {
  return (
    <div className='main-payment'>
      <h3>Pagamento</h3>
      <div>
        <label>Entrada</label>
        <input/>

        <label>Saída</label>
        <input/>
      </div>
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
            <option value="2">Mensalista</option>
        </select>
      </div>
      <textarea/>
    </div>
  )
}
