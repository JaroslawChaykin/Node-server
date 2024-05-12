import { body } from "express-validator";

export const registerValidation = [
    body("email", "Mail bad").isEmail(),
    body("password", "password min 6 symbols").isLength({ min: 6 }),
    body("firstName", "Say your name").isLength({ min: 3 }),
    body("avatarUrl", "Bad link to image").optional().isURL(),
];
