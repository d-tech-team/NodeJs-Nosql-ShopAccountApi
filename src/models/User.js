import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('User', UserSchema);