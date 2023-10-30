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
        "UPDATE cad_veiculos SET `placa` = ?, `descricao` = ?, `entrada` = ?, `tipo` = ?, `tipocli` WHERE `idVei` = ?";

    const values = [
        req.body.placa,
        req.body.descricao,
        req.body.entrada,
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



