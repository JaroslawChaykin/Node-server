import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            nickname: req.body.nickname,
            birthday: req.body.birthday,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData,
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
            err: err,
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, nickname } = req.body;

        const user = await UserModel.findOne({
            $or: [{ email }, { nickname }],
        });

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass || !user) {
            return res.status(404).json({
                message: "Wrong login or password",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
            err: err,
        });
    }
};
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {}
};
export const deleteMe = async (req, res) => {
    try {
        const result = await UserModel.findByIdAndDelete(req.userId);

        if (!result) {
            return res.status(400).json({
                message: "bad request",
            });
        }

        res.status(200).json({
            message: "user removed",
        });
    } catch (err) {}
};

export const getUserData = async (req, res) => {
    try {
        const result = await UserModel.findOne({
            nickname: req.params.nickname,
        });

        if (!result) {
            return res.status(404).json({
                message: "not found",
            });
        }

        const { passwordHash, updatedAt, ...user } = result._doc;

        res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            message: "some error",
        });
    }
};
