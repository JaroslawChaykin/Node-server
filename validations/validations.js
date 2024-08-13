import { body, check, oneOf } from "express-validator";

export const loginValidation = [
    oneOf([
        check("email", "email or nickname").isEmail(),
        check("nickname", "email or nickname").isLength({ min: 4, max: 20 }),
    ]),
    body("password", "password min 6 symbols").isLength({ min: 6 }),
];
export const registerValidation = [
    body("email", "Mail bad").isEmail(),
    body("nickname", "nickname min length 4 max length 20").isLength({
        min: 4,
        max: 20,
    }),
    body("password", "password min 6 symbols").isLength({ min: 6 }),
    body("birthday", "is not Date").isISO8601("yyyy-mm-dd").toDate(),
    body("firstName", "Min length name is 2").optional().isLength({ min: 2 }),
    body("avatarUrl", "Bad link to image").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Min title length is 3")
        .isLength({ min: 3, max: 20 })
        .isString(),
    body("text", "Max symbols for text 300").isLength({ max: 1000 }).isString(),
    body("tags", "Need array").optional().isArray(),
    body("imageUrl", "Bad link to image").optional().isString(),
];
