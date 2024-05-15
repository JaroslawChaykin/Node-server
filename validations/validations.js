import {body} from "express-validator";

export const loginValidation = [
    body("email", "Mail bad").isEmail(),
    body("password", "password min 6 symbols").isLength({min: 6}),
];
export const registerValidation = [
    body("email", "Mail bad").isEmail(),
    body("password", "password min 6 symbols").isLength({min: 6}),
    body("firstName", "Say your name").isLength({min: 3}),
    body("avatarUrl", "Bad link to image").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Min title length is 3").isLength({min: 3}).isString(),
    body("text", "Max symbols for text 300").isLength({max: 300}).isString(),
    body("tags", "Need array").optional().isString(),
    body("imageUrl", "Bad link to image").optional().isString(),
];
