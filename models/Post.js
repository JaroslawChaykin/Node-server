import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        imageUrl: String,
        isPublic: {
            default: false,
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
