import HistoryBuyModel from '../models/HistoryBuy.js';
import AccountModel from '../models/Account.js';


export const list = async (req, res) => {
    try {
        let historyBuy = await HistoryBuyModel.find({
            userId: req.user._id,
        });

        historyBuy = historyBuy.map(async historyBuy => {
            const account = await AccountModel.findOne({
                _id: historyBuy.accountId,
            })
            return {
                ...historyBuy._doc,
                account
            }
        })

        return res.status(200).json({
            success: true,
            data: historyBuy
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const createNormal = async (req, res) => {
    const { accountId } = req.body;
    try {

    } catch (error) {

    }
}