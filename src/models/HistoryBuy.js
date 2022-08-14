import mongoose from "mongoose"
const { Schema } = mongoose

const HistoryBuySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    createdAt: {
        type: Date,
    }
})

export default mongoose.model("HistoryBuy", HistoryBuySchema)