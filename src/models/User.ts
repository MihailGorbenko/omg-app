import mongoose, { model, Model, Schema, Types } from "mongoose";



const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    avatar_url: { type: String, required: true },
    avatar_min_url: { type: String, required: true },
})

export default model('User', userSchema)