import AccountModel from '../models/Account.js';
import ImageModel from '../models/Image.js';
import SubCategory from '../models/SubCategory.js';
import { validationResult } from 'express-validator';
import { removeFile } from '../utils/removeFile.util.js';
import { createSlug } from '../utils/createSlug.util.js';

export const list = async (req, res) => {
    try {
        let list = await AccountModel.find();

        list = await Promise.all(list.map(async (item) => {
            const subCategory = await SubCategory.findById(item.subCategoryId);
            const images = await ImageModel.find({ accountId: item._id });
            return {
                ...item._doc,
                subCategory,
                images
            }
        }))

        return res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const get = async (req, res) => { }

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            data: errors.array()[0].msg
        });
    }

    const { username, password, description, type, price, subCategoryId } = req.body;
    let data = {}

    const subCategory = await SubCategory.findById(subCategoryId)
    if (!subCategory) {
        return res.status(404).json({
            success: false,
            data: "Sub Category not found"
        })
    }

    if (type === 'random') {
        data = {
            username,
            password,
            type: 'random',
            subCategoryId,
        }
    }

    else {
        if (req.files.length === 0) {
            return res.status(422).json({
                success: false,
                data: "Thumbnail is required"
            });
        }
        if (!description) {
            return res.status(422).json({
                success: false,
                data: "Description is required"
            });
        }
        if (!price) {
            return res.status(422).json({
                success: false,
                data: "Price is required"
            });
        }
        data = {
            username,
            password,
            description,
            type: 'normal',
            price,
            subCategoryId,
        }
    }

    try {
        const account = await AccountModel.create(data);
        if (type === 'normal') {
            await Promise.all(req.files.map(async (file) => {
                await ImageModel.create({
                    url: file.filename,
                    accountId: account._id
                })
            }))
        }
        return res.status(200).json({
            success: true,
            data: 'Create account success'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }


}

export const update = async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            data: errors.array()[0].msg
        });
    }
    const { username, password, description, type, price, subCategoryId } = req.body;
    let data = {}

    try {
        const account = await AccountModel.findById(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                data: "Account not found"
            })
        }

        const subCategory = await SubCategory.findById(subCategoryId)

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                data: "Sub Category not found"
            })
        }

        if (type === 'random') {
            data = {
                username,
                password,
                type: 'random',
                subCategoryId,
            }
        }

        else {
            if (req.files.length > 0) {
                const images = await ImageModel.find({ accountId: account._id });

                await Promise.all(images.map((image) => {
                    removeFile(image.url);
                }))

                await ImageModel.deleteMany({ accountId: id });

                await Promise.all(req.files.map(async (file) => {
                    await ImageModel.create({
                        url: file.filename,
                        accountId: id
                    })
                }))
            }

            if (!description) {
                return res.status(422).json({
                    success: false,
                    data: "Description is required"
                });
            }
            if (!price) {
                return res.status(422).json({
                    success: false,
                    data: "Price is required"
                });
            }
            data = {
                username,
                password,
                description,
                type: 'normal',
                price,
                subCategoryId,
            }
        }

        return res.status(200).json({
            success: true,
            data: 'Update account success'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const account = await AccountModel.findById(id);

        if (!account) {
            return res.status(404).json({
                success: false,
                data: "Account not found"
            })
        }

        const images = await ImageModel.find({ accountId: id });

        await Promise.all(images.map((image) => {
            removeFile(image.url);
        }))

        await ImageModel.deleteMany({ accountId: id });
        await AccountModel.deleteOne({ _id: id });

        return res.status(200).json({
            success: true,
            data: 'Remove account success'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }

}