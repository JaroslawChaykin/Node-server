import express from "express";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import { getMe, login, register } from "./controllers/UserController.js";

mongoose
    .connect(
        "mongodb+srv://jaroslawchaikin:wwwww1@cluster0.1s3apa6.mongodb.net/blog"
    )
    .then(() => {
        console.log("DB OK");
    })
    .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());

app.post("/auth/login", login);

app.post("/auth/register", registerValidation, register);

app.get("/auth/me", checkAuth, getMe);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});
