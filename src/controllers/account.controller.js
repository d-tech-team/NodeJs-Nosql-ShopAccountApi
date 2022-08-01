import AccountModel from '../models/Account.js';
import ImageModel from '../models/Image.js';
import SubCategory from '../models/SubCategory.js';
import { validationResult } from 'express-validator';
import { removeFile } from '../ultils/removeFile.ultil.js';
import { createSlug } from '../ultils/createSlug.ultil.js';

export const list = async (req, res) => {
    try {
        let list = await AccountModel.find().populate({
            path: 'subCategory',
            options: {strictPopulate: false},
            option: {strictPopulate: false},
        });
       
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
        if (!req.files) {
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
            (req.files).forEach(async (file) => {
                ImageModel.create({
                    url: file.filename,
                    accountId: account._id
                })
            })
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

export const update = async (req, res) => { }

export const remove = async (req, res) => { }