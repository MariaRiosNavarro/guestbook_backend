import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { getAllUsers, saveUserComment } from "./utils/filestorage.js";

//config

const app = express();
app.use(express.json());

//dotenv

dotenv.config();

const PORT = process.env.PORT;

//cors

// app.use(cors({origin: process.env.CORS_ORIGIN}))

app.use(cors());

//!ROUTES

// !GET

app.get("/api/users", (req, res) => {
  getAllUsers()
    .then((data) => res.json(data))
    .catch(() => {
      res.status(500).end();
    });
});

//!POST

app.post("/api/users", (req, res) => {
  let user = req.body;
  saveUserComment(user);
  console.log(user);
});

//listen

app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
