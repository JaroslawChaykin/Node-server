import express from "express";
import mongoose from "mongoose";
import multer from "multer"

import {loginValidation, postCreateValidation, registerValidation} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
    .connect(
        "mongodb+srv://jaroslawchaikin:wwwww1@cluster0.1s3apa6.mongodb.net/blog"
    )
    .then(() => {
        console.log("DB OK");
    })
    .catch((err) => console.log("DB ERROR", err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage})

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
app.delete("/auth/remove", checkAuth, UserController.deleteMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    console.log(req.file)
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});
