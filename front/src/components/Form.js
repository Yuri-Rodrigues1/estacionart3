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
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedTipocli, setSelectedTipocli] = useState(''); // Estado para armazenar a opção de "tipo" selecionada

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.placa.value = onEdit.placa;
      user.descricao.value = onEdit.descricao;
      user.entrada.value = onEdit.entrada;
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

    if (onEdit) {
      await axios
        .put("http://localhost:3000/" + onEdit.idVei, {
          placa: user.placa.value,
          descricao: user.descricao.value,
          entrada: user.entrada.value,
          tipo: selectedTipo, 
          tipocli: selectedTipocli
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3000", {
          placa: user.placa.value,
          descricao: user.descricao.value,
          entrada: user.entrada.value,
          tipo: selectedTipo, 
          tipocli: selectedTipocli
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.placa.value = "";
    user.descricao.value = "";
    user.entrada.value = "";
    setSelectedTipo(''); 
    setSelectedTipocli('');

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Placa</Label>
        <Input name="placa" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" />
      </InputArea>
      <InputArea>
        <Label>Entrada</Label>
        <input type="datetime-local" name="entrada" />
      </InputArea>

      <InputArea>
        <Label>Tipo</Label>
        <select value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="1">Moto</option>
          <option value="2">Carro</option>
        </select>
      </InputArea>
      <InputArea>
        <Label>Tipo Cli</Label>
        <select value={selectedTipocli} onChange={(e)=> setSelectedTipocli(e.target.value)}>
          <option value="">Selecione...</option>
          <option value="1">Hora</option>
          <option value="2">Diaria</option>
          <option value="3">Mensalista</option>
        </select>
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;