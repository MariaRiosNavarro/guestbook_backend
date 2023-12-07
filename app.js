import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import {
  getAllUsers,
  saveUserComment,
  deleteUser,
  editBlog,
  getOneUser,
} from "./utils/filestorage.js";
//# 1-VALIDATION
import Joi from "joi";

//# 2-Create Schema

// const userSchema = Joi.object({
//   firstname: Joi.string().alphanum().min(3).max(10).trim().required(),
//   lastname: Joi.string().trim(),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net", "de", "es", "it"] },
//   }),
//   text: Joi.string(),
// });

//config

const app = express();
// app.use(express.json());

//multer
const upload = multer({ dest: "./uploads" });

//dotenv

dotenv.config();

const PORT = process.env.PORT;

//für die img brauchen es damit expreaa das liefert
app.use("/uploads", express.static("./uploads"));

//cors

// app.use(cors({origin: process.env.CORS_ORIGIN}))

app.use(cors());

//!ROUTES

// #GET

app.get("/api/users", (req, res) => {
  getAllUsers()
    .then((data) => res.json(data))
    .catch(() => {
      res.status(500).end();
    });
});

//#POST

app.post("/api/users", upload.single("img"), (req, res) => {
  const item = req.body;
  item.id = uuidv4();
  item.img = req.file.path;
  console.log("-----👉-------👉----BODY👉", item);
  saveUserComment(item)
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

//#DELETE
app.delete("/api/users", (req, res) => {
  res.end();
});

//#UPDATE
app.put("/api/users", (req, res) => {
  res.end();
});

//listen

app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
