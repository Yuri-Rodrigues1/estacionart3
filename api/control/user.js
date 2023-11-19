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
  const qSelect = "SELECT * FROM cad_veiculos WHERE `idVei` = ?";
  const qDelete = "DELETE FROM cad_veiculos WHERE `idVei` = ?";
  const qInsertHistorico = "INSERT INTO historico (placa, descricao, entrada, tipo, tipocli, data_saida) VALUES (?, ?, ?, ?, ?, NOW())";

  db.query(qSelect, [req.params.idVei], (err, result) => {
      if (err) {
          return res.json(err);
      }

      if (result.length === 0) {
          return res.status(404).json("Veículo não encontrado");
      }

      const veiculoRemovido = result[0];

      db.query(qDelete, [req.params.idVei], (errDelete) => {
          if (errDelete) {
              return res.json(errDelete);
          }

          db.query(qInsertHistorico, [
              veiculoRemovido.placa,
              veiculoRemovido.descricao,
              veiculoRemovido.entrada,
              veiculoRemovido.tipo,
              veiculoRemovido.tipocli,
          ], (errInsert) => {
              if (errInsert) {
                  return res.json(errInsert);
              }

              return res.status(200).json("Veículo removido e movido para o histórico.");
          });
      });
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

  export const getOcorrencias = (_, res) =>{
    const q = "SELECT * FROM ocorrencias";

    db.query(q, (err, data) =>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addOcorrencia = (req, res) => {
    const q = "INSERT INTO ocorrencias (`data`, `descricao`) VALUES (?, ?)";

    const values = [
        req.body.data,
        req.body.observacao,
    ];

    try {
        db.query(q, values, (err) => {
            if (err) {
                console.error("Erro ao adicionar ocorrência:", err);
                return res.status(500).json({ error: "Erro interno ao adicionar ocorrência" });
            }

            console.log("Ocorrência adicionada com sucesso!");
            return res.status(200).json("Ocorrência adicionada com sucesso");
        });
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return res.status(500).json({ error: "Erro interno ao processar a requisição" });
    }
};

export const updateOcorrencia = (req, res) => {
    const q = "UPDATE ocorrencias SET `data` = ?, `descricao` = ? WHERE `id` = ?";

    const values = [
        req.body.data,
        req.body.observacao,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso");
    });
};

export const deleteOcorrencia = (req, res) => {
    const q = "DELETE FROM ocorrencias WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Ocorrência deletada com sucesso");
    });
};

export const getHistorico = (_, res) =>{
  const q = "SELECT * FROM historico";

  db.query(q, (err, data) =>{
      if(err) return res.json(err);

      return res.status(200).json(data);
  });
};