import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Axios from "axios";
import './Cadastro.css';

function Cadastro() {
  return (
    <div className="container">
    <h1>Cadastro</h1>
    <Formik>
      <Form className="cadastro-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            className="form-control"
            placeholder="Digite seu email"
          />
          <ErrorMessage component="span" name="email" className="form-error" />
        </div>
  
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <Field
            name="password"
            type="password"
            className="form-control"
            placeholder="Digite sua senha"
          />
          <ErrorMessage component="span" name="password" className="form-error" />
        </div>
  
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirme sua senha</label>
          <Field
            name="confirmpassword"
            type="password"
            className="form-control"
            placeholder="Confirme sua senha"
          />
          <ErrorMessage component="span" name="confirmpassword" className="form-error" />
        </div>
  
        <div class="button-group">
          <button class="btn btn-success" type="submit">Criar</button>
          <a href="/" class="btn btn-danger">Voltar</a>
        </div>
      </Form>
    </Formik>
  </div>
  )
}

export default Cadastro