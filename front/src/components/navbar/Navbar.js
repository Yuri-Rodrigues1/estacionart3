import { useState} from 'react';
import ReactDo from 'react';
import Modal from 'react-modal';
import './Navbar.css';

Modal.setAppElement("#root");


Modal.setAppElement('#root');



function Navbar() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="navbar">
      <button to="/historico">Histórico</button>
      <button to="/ocorrencias">Ocorrências</button>
      <button onClick={openModal}>Valores</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Valores Modal"
        overLayClassName="modal-overlay"
        className="modal-content"
        >
          <h1>Valores</h1>
          <hr />
          <p>
            <div className='veiculos'>
              <h4>Carro</h4>
              <h4>Moto</h4>
            </div>

            <div className='valores'>
              <table>
                <tr>
                 <td>Fração:</td>
                  <td>R$2,50</td>
                  <td>R$1,50</td>                
                </tr>
                <tr>
                 <td>Hora:</td>
                 <td>R$10,00</td>
                 <td>R$6,00</td>
              </tr>
              <tr>
                <td>Diária:</td>
                <td>R$35,00</td>
                <td>R$25,00</td>
              </tr>
              <tr>
                <td>Mensal:</td>
                <td>R$250,00</td>
                <td>R$150,00</td>
              </tr>       

            </table>
            </div>
            
           
          </p>
          <button onClick={closeModal}>Fechar</button>
        </Modal>
    </div>
  );
}



export default Navbar;
