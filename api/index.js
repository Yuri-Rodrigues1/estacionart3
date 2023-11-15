import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "estacion",
});

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  login,
  cadastro
} from "./control/user.js";


app.get("/", getUsers);
app.post("/", addUser);
app.put("/:idVei", updateUser);
app.delete("/:idVei", deleteUser);
app.post("/login", login);
app.post("/cadastro", cadastro);

app.listen(3000, () => {
  console.log("Servidor está rodando na porta 3000");
});