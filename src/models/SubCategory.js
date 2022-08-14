import mongoose from "mongoose";
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
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
        require: false,
    },
    price: {
        type: Number,
        require: false
    },
    type: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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

export default mongoose.model('SubCategory', SubCategorySchema);