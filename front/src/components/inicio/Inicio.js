import GlobalStyle from "../../styles/global";
import styled from "styled-components";
import Form from "../Form";
import Grid from "../Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Payment from "../Payment/Payment";
import Navbar from "../navbar/Navbar";

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
  const [shouldRemoveItem, setShouldRemoveItem] = useState(false);

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

    if (shouldRemoveItem && deletedItem) {
        const newArray = users.filter((user) => user.idVei !== deletedItem.idVei);
        setUsers(newArray);

        // Adicione o veículo removido ao histórico
        axios.post("http://localhost:3000/ocorrencias", {
            data: deletedItem.entrada,
            observacao: `Veículo removido - Placa: ${deletedItem.placa}`,
        }).then(() => {
            console.log("Veículo movido para o histórico");
        }).catch((error) => {
            console.error("Erro ao mover veículo para o histórico:", error);
        });

        setDeletedItem(null);
    }

    setShouldRemoveItem(false);
};

  return (
    <>
      <Navbar />
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
            setShouldRemoveItem={setShouldRemoveItem}
          />
        </Container>
      </AppContainer>
      {paymentModalOpen && (
        <div className="modal-overlay">
          <Payment deletedItem={deletedItem} shouldRemoveItem={shouldRemoveItem} setShouldRemoveItem={setShouldRemoveItem}/>
          <button onClick={closePaymentModal}>Fechar</button>
        </div>
      )}
      <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;