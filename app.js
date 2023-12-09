import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
// import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import {
  getAllUsers,
  saveUserComment,
  deleteUser,
  editUser,
  getOneUser,
} from "./utils/filestorage.js";
//# 1-VALIDATION
import { userSchema } from "./utils/schema.js";
import Joi from "joi";

//# 2-Create Schema

//config

const app = express();
// app.use(express.json());

//multer
const upload = multer({ dest: "./uploads" });

//dotenv: do not need dotenv.config() here, if we write direct above: import "dotenv/config"

// dotenv.config();

const PORT = process.env.PORT;

//for the img you need expreaa to deliver it
//we release this route to show the images in frontend,
//if we store the images elsewhere, then these folders must also be given with static
app.use("/uploads", express.static("./uploads"));

//cors
// change cors

app.use(cors({ origin: process.env.CORS_ORIGIN }));

// app.use(cors());

//!ROUTES

// #GET ALL

app.get("/api/users", (req, res) => {
  getAllUsers()
    .then((data) => res.json(data))
    .catch(() => {
      res.status(500).end();
    });
});

// #GET ONE

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  getOneUser(id)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

//#POST

app.post("/api/users", upload.single("img"), (req, res) => {
  let item = req.body;

  console.log("-----👉-------👉----BODY👉", item);
  // joi validation

  const { error, value } = userSchema.validate(item);

  if (error) {
    console.log("validation error_________❌", error.message);
    res.status(418).json({ message: error.message });
    return;
  }

  item = value;
  item.id = uuidv4();

  if (req.file) {
    item.img = req.file.path;
  }

  saveUserComment(item)
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// #PUT

// #PUT

app.put("/api/users", upload.single("img"), (req, res) => {
  let editData = req.body;
  if (req.file) {
    editData.img = req.file.path;
  }

  console.log("-------------🤡", req.body);

  const { error, value } = userSchema.validate(editData);

  if (error) {
    console.log("validation error_________❌", error.message);
    res.status(418).json({ message: error.message });
    return;
  }

  // if (req.file) {
  //   editData.img = req.file.path;
  // }

  editData = value;
  console.log("------editdata after val-------😬", editData);

  editUser(editData)
    .then(() => res.end())
    .catch(() => res.status(500).end());
});

//#DELETE
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("--------❌", req);
  console.log("--------👉", id);

  deleteUser(id)
    .then(() => res.json({ message: "Article deleted successfully!" }))
    .then(() => res.end())
    .catch((error) => res.status(500).end(error));
});

//listen

app.listen(PORT, () => {
  console.log("Port is:http://localhost:" + PORT);
});
