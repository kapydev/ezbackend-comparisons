import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    googleData: Object
})

export const userModel = mongoose.model("User", userSchema)


