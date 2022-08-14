import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

export default mongoose.model('Category', CategorySchema);