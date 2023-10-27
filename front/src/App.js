import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Payment from "./components/Payment/Payment";


const AppContainer = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  gap: 15px; 
  justify-content: flex-end;
  
`;

const Container = styled.div`
  width: 170%;
  max-width: 800px;
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
  }, [setUsers]);


  const availableVagas = 100 - users.length; 

  return (
    <>
      <AppContainer>
        <Container>
          <Title>E s t a c i o n a r t e</Title>
          <p>Vagas Livres: {availableVagas}</p>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_LEFT} />
        <Payment/>
      </AppContainer>
      <GlobalStyle />
    </>
  );
}

export default App;