import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { setup, getAllUsers, saveUserComment } from "./utils/filestorage.js";
//# 1-VALIDATION
import Joi from "joi";

//# 2-Create Schema

const userSchema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(10).trim().required(),
  lastname: Joi.string().trim(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "de", "es", "it"] },
  }),
  text: Joi.string(),
});

//config

const app = express();
app.use(express.json());

setup();

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
  console.log("-----👉-------👉----BODY👉", req.body);
  let user = req.body;

  // !VALIDATION

  const { error, value } = userSchema.validate(user);
  if (error) {
    console.log(error.message);
    res.status(418).json({ message: error.message });
    return;
  }
  user = value;

  //!   save user after validation
  saveUserComment(user);

  res.json({ message: "Received the data successfully!" });
  res.end();
});

//listen

app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
