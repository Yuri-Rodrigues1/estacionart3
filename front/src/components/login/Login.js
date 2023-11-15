import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
    });
  };

  const validationLogin = Yup.object().shape({
    email: Yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
    password: Yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Este é um campo obrigatório"),
  });

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              className="form-control"
              placeholder="Digite seu email"
            />
            <ErrorMessage component="div" name="email" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <Field
              name="password"
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
            />
            <ErrorMessage component="div" name="password" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-success btn-block">
            Login
          </button>
          <Link to="/cadastro" className="btn btn-primary btn-block mt-3">
            Cadastro
          </Link>
        </Form>
      </Formik>
    </div>
  );
}