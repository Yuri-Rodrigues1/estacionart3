import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Payment from "./components/Payment/Payment";
import Navbar from "./components/navbar/Navbar.js";



const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-end;
`;

const Container = styled.div`
  width: 170%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000");
      setUsers(res.data.sort((a, b) => (a.placa > b.placa ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const availableVagas = 100 - users.length;

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <>
      <Navbar/>
      <AppContainer>
        <Container>
          <Title>E s t a c i o n a r t e</Title>
          <p>Vagas Livres: {availableVagas}</p>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <Grid
            setOnEdit={setOnEdit}
            users={users}
            setUsers={setUsers}
            setDeletedItem={setDeletedItem}
            deletedItem={deletedItem}
            openPaymentModal={openPaymentModal}
          />
        </Container>
      </AppContainer>
      {paymentModalOpen && (
        <div className="modal-overlay">
          <Payment deletedItem={deletedItem} />
          {/* Adicione um botão ou função para fechar o modal */}
          <button onClick={closePaymentModal}>Fechar</button>
        </div>
      )}
      <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;