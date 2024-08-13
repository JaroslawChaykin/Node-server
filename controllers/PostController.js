import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const post = await doc.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            message: "Create post error",
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const reg = new RegExp(req.query._search);

        let posts = await PostModel.find({
            title: reg,
            isPublic: true,
        })
            .populate("user")
            .exec();

        res.status(200).json(posts.reverse());
    } catch (err) {
        res.status(500).json({
            message: "Bad reuest for posts",
        });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        let posts = await PostModel.find({
            user: req.params.id,
            isPublic: true,
        });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            message: "Bad reuest for posts",
        });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        let posts = await PostModel.find({
            user: req.userId,
        });
        console.log(posts);

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            message: "Bad reuest for posts",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {
                    viewsCount: 1,
                },
            },
            {
                returnDocument: "after",
                populate: "user",
            }
        )
            .then((doc) => {
                if (!doc || !doc.isPublic) {
                    return res.status(404).json({
                        message: "Not found Post",
                    });
                }

                res.json(doc);
            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Can't return post",
                    err,
                });
            });
    } catch (err) {
        res.status(500).json({
            message: "Bad reuest for posts",
            err,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Not found Post",
                    });
                }

                res.json({
                    message: "Removed",
                });
            })
            .catch((err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: "Can't delete post",
                        err,
                    });
                }
            });
    } catch (err) {
        res.status(500).json({
            message: "Bad reuest for posts",
            err,
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            },
            {
                returnDocument: "after",
                populate: "user",
            }
        );

        res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({
            message: "Not updated",
        });
    }
};
