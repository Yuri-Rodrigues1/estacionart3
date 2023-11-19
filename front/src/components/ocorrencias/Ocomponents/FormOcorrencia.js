import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  box-sizing: border-box;
  margin-top: 8px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 36px;
  width: 100%;
`;

const Form = ({ onEdit, setOnEdit, getOcorrencias }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      const formattedDate = new Date(onEdit.data).toISOString().split('T')[0];

      user.data.value = formattedDate;
      user.observacao.value = onEdit.descricao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (!user.data.value || !user.observacao.value) {
      return toast.warn('Preencha todos os campos!');
    }

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/ocorrencias/${onEdit.id}`, {
          data: user.data.value,
          observacao: user.observacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:3000/ocorrencias', {
          data: user.data.value,
          observacao: user.observacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.data.value = '';
    user.observacao.value = '';

    setOnEdit(null);
    getOcorrencias();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <Row>
        <InputArea>
          <Label>Data da Ocorrência</Label>
          <Input name='data' type='date' />
        </InputArea>

        <InputArea>
          <Label>Observação</Label>
          <Input name='observacao' />
        </InputArea>
      </Row>

      <Button type='submit'>Salvar</Button>
    </FormContainer>
  );
};

export default Form;
