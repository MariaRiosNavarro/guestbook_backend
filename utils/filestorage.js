import fs from "fs/promises";
import fsystem from "fs";
import { v4 as uuidv4 } from "uuid";
import { off } from "process";

//!create storage folder

export const setup = () => {
  fs.access("./storage")
    .then(() => console.log("Storage folder allready exist"))
    .catch(() => fs.mkdir("./storage"));
};

//! Save a user with comment

export const saveUserComment = (user) => {
  user.id = uuidv4();
  const filePath = "./storage/" + user.id;
  fs.writeFile(filePath, JSON.stringify(user), (error) => {
    if (error) {
      console.error("Error saving user", error);
    } else {
      console.log("User saved successfully", filePath);
    }
  });
};

//!create one Array with all Users with his comments

export const getAllUsers = () => {
  return fs.readdir("./storage").then((users) => {
    const usersArray = [];
    for (const user of users) {
      const userData = fsystem.readFileSync("./storage/" + user);
      const userString = JSON.parse(userData);
      usersArray.push(userString);
    }
    return usersArray;
  });
};
