import fs from "fs/promises";
import fsystem from "fs";
// import { v4 as uuidv4 } from "uuid"; wir geben die id in frontend

//!create storage folder

// MAN KANN der setup ohne funktion, wenn ich den filestorage in den APP aufrufen, wenn aber die funktion exportiren, muss man eine vernunftige namen geben

const DBPATH = "./storage/";

fs.access(DBPATH)
  .then(() => console.log("Storage folder allready exist"))
  .catch(() => fs.mkdir(DBPATH));

// export const setup = () => {
//   fs.access("./storage")
//     .then(() => console.log("Storage folder allready exist"))
//     .catch(() => fs.mkdir("./storage"));
// };

//! Save a user with comment

export const saveUserComment = (user) => {
  fs.writeFile(DBPATH + user.id, JSON.stringify(user), (error) => {
    if (error) {
      console.error("Error saving user", error);
    } else {
      console.log("User saved successfully", filePath);
    }
  });
};

//!create one Array with all Users with his comments

export const getAllUsers = () => {
  return fs.readdir(DBPATH).then((users) => {
    const usersArray = [];
    for (const user of users) {
      const userData = fsystem.readFileSync(DBPATH + user);
      const userString = JSON.parse(userData);
      usersArray.push(userString);
    }
    return usersArray;
  });
};

//! get One User

export const getOneUser = (id) => {
  return fs
    .readFile("./storage/" + id)
    .then((data) => JSON.parse(data.toString()));
};

// ! delete user

export const deleteUser = (id) => {
  return getOneUser(id)
    .then((user) => fs.rm(user.img))
    .then(() => fs.rm("./storage" + id));
};

//!edit Blog

export const editBlog = (article_update) => {
  return getOneUser(article_update.id)
    .then(
      (old_article) => (old_article = { ...old_article, ...article_update })
    )
    .then((newArticle) =>
      fs.writeFile("./storage/" + newArticle.id, JSON.stringify(newArticle))
    );
};
