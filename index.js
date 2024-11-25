import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations/validations.js";
import { checkAuth, handleValidationErrors, checkUser } from "./utils/index.js";
import {
  UserController,
  PostController,
  CategoriesController,
  StatisticsController,
  WordsGameController,
} from "./controllers/index.js";

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
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

// Auth, Users
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.delete("/auth/remove", checkAuth, UserController.deleteMe);
app.get("/user/:nickname", UserController.getUserData);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

// Posts
app.get("/posts", PostController.getAll);
app.get("/posts/:id", checkUser, PostController.getOne);
app.get("/posts/user/:id", PostController.getUserPosts);
app.get("/posts/owner/get", checkAuth, PostController.getMyPosts);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);
app.patch("/posts/:id/public", checkAuth, PostController.updatePublicStatus);

app.post("/categories", CategoriesController.addCategory);
app.get("/categories", CategoriesController.getCategories);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});

app.get("/statistics", StatisticsController.getAllStatistics);

// Routes for the game
app.get("/words/:word", WordsGameController.findWord);
app.get("/words/level/:level", WordsGameController.getLevel);
