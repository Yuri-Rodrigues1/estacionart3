import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Cadastro.css';

function Cadastro() {
  const handleClickCadastro = (values) => {
    Axios.post("http://localhost:3000/cadastro", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
    });
  };

  const validationCadastro = Yup.object().shape({
    email: Yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
    password: Yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este é um campo obrigatório"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "As duas senhas não são iguais")
  });

  return (
    <div className="container">
      <h1>Cadastro</h1>
      <Formik initialValues={{}} onSubmit={handleClickCadastro} validationSchema={validationCadastro}>
        <Form className='cadastro-form'>
          <div className='cadastro-form-group'>
            <Field name="email" className="form-field" placeholder="Digite seu email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>

          <div className='cadastro-form-group'>
            <Field name="password" className="form-field" placeholder="Digite sua senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>

          <div className='cadastro-form-group'>
            <Field name="confirmpassword" className="form-field" placeholder="Confirme sua senha" />
            <ErrorMessage component="span" name="confirmpassword" className="form-error" />
          </div>

          <button className='btn btn-success' type='submit'>Criar</button>
          <Link to="/" className='btn btn-danger'>Voltar</Link>
        </Form>
      </Formik>
    </div>
  );
}

export default Cadastro;