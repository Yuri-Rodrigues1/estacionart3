import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "estacion",
});

import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from "./control/user.js";

app.use("/", (req, res, next) => {
    const router = express.Router();

    router.get("/", getUsers);
    router.post("/", addUser);
    router.put("/:idVei", updateUser);
    router.delete("/:idVei", deleteUser);
    
    router(req, res, next);
});

app.listen(3000);