import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    summary: String,
    description: String
})

export const postModel = mongoose.model("Post", postSchema)


