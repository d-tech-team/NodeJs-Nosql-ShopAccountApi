import mongoose, { Schema } from "mongoose";


const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true
    }
})