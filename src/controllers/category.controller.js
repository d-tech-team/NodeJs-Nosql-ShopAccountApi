import CategoryModel from "../models/Category.js";
import { validationResult } from "express-validator";
import { removeFile } from "../ultils/removeFile.ultil.js";
import { createSlug } from "../ultils/createSlug.ultil.js";

export const list = async (req, res) => {
    try {
        const list = await CategoryModel.find({});
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

export const get = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await CategoryModel.findById(id);
        if (!category)
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        return res.status(200).json({
            success: true,
            data: category
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const create = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            data: errors.array()[0].msg
        });
    }
    if (!req.file) {
        return res.status(422).json({
            success: false,
            data: "Thumbnail is required"
        });
    }
    const { name } = req.body;
    try {
        CategoryModel.create({
            name,
            slug: createSlug(name),
            thumbnail: req.file.filename,
            userId: '4eb6e7e7e9b7f4194e000001'
        });
        return res.status(201).json({
            success: true,
            data: 'Category created successfully'
        });
    } catch (error) {
        console.log(error);
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
    const { name } = req.body;

    try {
        let category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }
        let data = {};
        if (req.file) {
            data = {
                name,
                slug: createSlug(name),
                thumbnail: req.file.filename,
                userId: '4eb6e7e7e9b7f4194e000001'
            }
            removeFile(category.thumbnail);
        }
        else {
            data = {
                name,
                slug: createSlug(name),
                userId: '4eb6e7e7e9b7f4194e000001'
            }
        }

        await CategoryModel.findOneAndUpdate(id, data);
        return res.status(201).json({
            success: true,
            data: 'Category updated successfully'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        }
        removeFile(category.thumbnail);
        await CategoryModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            data: 'Delete category success'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}





