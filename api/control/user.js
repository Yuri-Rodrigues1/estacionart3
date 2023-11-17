import { db } from "../index.js";
import express from 'express';

export const getUsers = (_, res) => {
  const q = "SELECT * FROM cad_veiculos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const addUser = (req, res) => {
    const q =
        "INSERT INTO cad_veiculos(`placa`, `descricao`, `entrada`, `tipo`, `tipocli`) VALUES(?)";

    const values = [
        req.body.placa,
        req.body.descricao,
        req.body.entrada,
        req.body.tipo,
        req.body.tipocli
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Veículo Cadastrado.");
    });
};

export const updateUser = (req, res) => {
  const q =
  "UPDATE cad_veiculos SET `placa` = ?, `descricao` = ?, `entrada` = ?, `tipo` = ?, `tipocli` = ? WHERE `idVei` = ?";

const values = [
  req.body.placa,
  req.body.descricao,
  new Date(req.body.entrada), // Converter a entrada para um objeto Date
  req.body.tipo,
  req.body.tipocli
];

db.query(q, [...values, req.params.idVei], (err) => {
  if (err) return res.json(err);

  return res.status(200).json("Veículo Atualizado.");
})
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM cad_veiculos WHERE `idVei` = ?";

    db.query(q, [req.params.idVei], (err, result) => {
        if (err) {
            return res.json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json("Veículo não encontrado");
        }

        return res.status(200).json("Veículo Excluído.");
    });
};

export const login = (req, res) => {
    const values = [
      req.body.email,
      req.body.password,
    ];
  
    const q = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  
    db.query(q, values, (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        res.send({ msg: "Usuário logado com sucesso", redirectTo: "http://localhost:3001/inicio" });
      } else {
        res.send({ msg: "Usuário não encontrado" });
      }
    });
  };
  
  export const cadastro = (req, res) => {
    const values = [
      req.body.email,
      req.body.password,
    ];
  
    const q = "SELECT * FROM usuarios WHERE email = ?";
  
    db.query(q, [values[0]], (err, result) => {
      if (err) {
        console.error(err);
        res.send(err);
      }
      if (result.length === 0) {
        db.query(
          "INSERT INTO usuarios (email, password) VALUES (?, ?)",
          [values[0], values[1]],
          (err, response) => {
            if (err) {
              res.send(err);
            }
            res.send({ msg: "Cadastrado com sucesso" });
          }
        );
      } else {
        res.send({ msg: "Email já cadastrado" });
      }
    });
  };