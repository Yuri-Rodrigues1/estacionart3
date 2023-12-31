import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "estacion",
}); 

import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    login,
    cadastro,
    getOcorrencias,
    addOcorrencia,
    updateOcorrencia,
    deleteOcorrencia,
    getHistorico
} from "./control/user.js";

app.get("/", getUsers);
app.post("/", addUser);
app.put("/:idVei", updateUser);
app.delete("/:idVei", deleteUser);
app.post("/login", login);
app.post("/cadastro", cadastro);
app.get("/ocorrencias", getOcorrencias);
app.post("/ocorrencias", addOcorrencia);
app.put("/ocorrencias/:id", updateOcorrencia);
app.delete("/ocorrencias/:id", deleteOcorrencia);
app.get("/historico", getHistorico );

app.listen(3000, () => {
    console.log("Servidor está rodando na porta 3000");
});