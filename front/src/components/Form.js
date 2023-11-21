import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 160px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 40px;
  margin-top: 30px;
`;

const submitButtonStyle = {
  width: '100%',
  height: '36px',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  color: 'white',
  backgroundColor: '#007bff', // Cor de fundo azul
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Sombra leve
  cursor: 'pointer',
  transition: 'background-color 0.3s ease', // Transição suave da cor de fundo
  display: 'flex', // Torna o botão um contêiner flexível
  alignItems: 'center', // Centraliza verticalmente o conteúdo
  justifyContent: 'center', // Centraliza horizontalmente o conteúdo
};

const formContainerStyle = {
  display: 'flex',         // Torna o formulário um contêiner flexível
  alignItems: 'center',     // Centraliza os itens ao longo do eixo transversal (vertical)
  justifyContent: 'center', // Centraliza os itens ao longo do eixo principal (horizontal)
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedTipocli, setSelectedTipocli] = useState("");
  const [placa, setPlaca] = useState("");

  const handlePlaca = (event) => {
    const value = event.target.value;
    setPlaca(value.toUpperCase());
  };

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      setPlaca(onEdit.placa);
      user.descricao.value = onEdit.descricao;
      user.entrada.value = formattedDate(onEdit.entrada);
      setSelectedTipo(onEdit.tipo);
      setSelectedTipocli(onEdit.tipocli);
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.placa.value ||
      !user.descricao.value ||
      !user.entrada.value ||
      !selectedTipo ||
      !selectedTipocli
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const formattedEntryDate = formattedDate(user.entrada.value);

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/${onEdit.idVei}`, {
          placa: user.placa.value,
          descricao: user.descricao.value,
          entrada: formattedEntryDate,
          tipo: selectedTipo,
          tipocli: selectedTipocli,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3000", {
          placa: user.placa.value,
          descricao: user.descricao.value,
          entrada: formattedEntryDate,
          tipo: selectedTipo,
          tipocli: selectedTipocli,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.placa.value = "";
    user.descricao.value = "";
    user.entrada.value = "";
    setSelectedTipo("");
    setSelectedTipocli("");

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit} style={formContainerStyle}>
    <InputArea>
      <Label>Placa</Label>
      <Input
        placeholder="xxx-xxxx"
        name="placa"
        value={placa}
        onChange={handlePlaca}
        maxLength={7}
      />
    </InputArea>
  
    <InputArea>
      <Label>Descrição</Label>
      <Input name="descricao" />
    </InputArea>
  
    <InputArea>
      <Label>Entrada</Label>
      <Input style={{width: 'auto'}} type="datetime-local" name="entrada" />
    </InputArea>
  
    <InputArea style={{borderRadius: '5px'  }}>
      <Label>Tipo</Label>
      <select
        value={selectedTipo}
        onChange={(e) => setSelectedTipo(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
      >
        <option value="">Selecione...</option>
        <option value="1">Moto</option>
        <option value="2">Carro</option>
      </select>
    </InputArea>
  
    <InputArea style={{borderRadius: '5px'}}>
      <Label>Tipo Cli</Label>
      <select
        value={selectedTipocli}
        onChange={(e) => setSelectedTipocli(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '3px', border: '1px solid #ccc' }}
      >
        <option value="">Selecione...</option>
        <option value="1">Hora</option>
        <option value="2">Diária</option>
        <option value="3">Mensalista</option>
      </select>
    </InputArea>
  
    <Button type="submit" style={submitButtonStyle}>SALVAR</Button>
  </FormContainer>
  

  );
};

export default Form;