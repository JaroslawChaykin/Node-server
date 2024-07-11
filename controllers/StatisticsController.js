import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export const getAllStatistics = async (req, res) => {
    try {
        const postsCount = await PostModel.countDocuments();
        const usersCount = await UserModel.countDocuments();

        res.status(200).json({
            posts: postsCount,
            users: usersCount,
        });
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
        });
    }
};
