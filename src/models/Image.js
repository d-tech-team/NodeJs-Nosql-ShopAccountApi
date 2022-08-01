import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('Image', ImageSchema);