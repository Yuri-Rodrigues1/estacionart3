import { useState} from 'react';
import ReactDo from 'react';
import Modal from 'react-modal';
import './Navbar.css';

Modal.setAppElement("#root");

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
      
      <button><a href="/inicio">Inicio</a></button>
      <button><a href="/historico">Histórico</a></button>
      <button><a href="/ocorrencias">Ocorrências</a></button>
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
        <button><a href="/">Logout</a></button>
    </div>
  );
}



export default Navbar;
