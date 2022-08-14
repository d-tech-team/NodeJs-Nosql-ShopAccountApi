import SubCategoryModel from "../models/SubCategory.js";
import CategoryModel from "../models/Category.js";
import { validationResult } from "express-validator";
import { removeFile } from "../utils/removeFile.util.js";
import { createSlug } from "../utils/createSlug.util.js";

export const list = async (req, res) => {
    try {
        let list = await SubCategoryModel.find({});

        list = await Promise.all(list.map(async (item) => {
            const category = await CategoryModel.findById(item.categoryId);
            return {
                ...item._doc,
                category
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

export const get = async (req, res) => {
    const id = req.params.id;
    try {
        const subCategory = await SubCategoryModel.findById(id);
        if (!subCategory)
            return res.status(404).json({
                success: false,
                data: "Sub Category not found"
            })
        return res.status(200).json({
            success: true,
            data: subCategory
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
    let data = {}
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
    const { name, type, price, categoryId } = req.body;
    if (['random', 'wheel'].includes(type) && !price) {
        return res.status(422).json({
            success: false,
            data: "Price is required"
        });
    }
    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category)
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        if (['random', 'wheel'].includes(type)) {
            data = {
                name,
                slug: createSlug(name),
                thumbnail: req.file.filename,
                price,
                type,
                categoryId,
                userId: req.user._id,
            }
        }
        else {
            data = {
                name,
                slug: createSlug(name),
                thumbnail: req.file.filename,
                type,
                categoryId,
                userId: req.user._id,
            }
        }

        await SubCategoryModel.create(data)
        return res.status(201).json({
            success: true,
            data: "Create sub category success"
        })
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
    const { name, price, categoryId } = req.body;

    let data = {};

    try {
        let subCategory = await SubCategoryModel.findById(id);
        if (!subCategory) {
            return res.status(404).json({
                success: false,
                data: "Sub Category not found"
            })
        }
        const category = await CategoryModel.findById(categoryId);
        if (!category)
            return res.status(404).json({
                success: false,
                data: "Category not found"
            })
        if (['random', 'wheel'].includes(subCategory.type) && !price) {
            return res.status(422).json({
                success: false,
                data: "Price is required"
            });
        }
        if (req.file) {
            if (['random', 'wheel'].includes(subCategory.type)) {
                data = {
                    name,
                    slug: createSlug(name),
                    thumbnail: req.file.filename,
                    price,
                    categoryId,
                    userId: req.user._id,
                }
            }
            else {
                data = {
                    name,
                    slug: createSlug(name),
                    thumbnail: req.file.filename,
                    categoryId,
                    userId: req.user._id,
                }
            }
            removeFile(subCategory.thumbnail);
        }
        else {
            if (['random', 'wheel'].includes(subCategory.type)) {
                data = {
                    name,
                    slug: createSlug(name),
                    price,
                    categoryId,
                    userId: req.user._id,
                }
            }
            else {
                data = {
                    name,
                    slug: createSlug(name),
                    categoryId,
                    userId: req.user._id,
                }
            }
        }
        await SubCategoryModel.findByIdAndUpdate(id, data);
        return res.status(201).json({
            success: true,
            data: 'Sub Category updated successfully'
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
        const subCategory = await SubCategoryModel.findById(id);
        if (!subCategory) {
            return res.status(404).json({
                success: false,
                data: "Sub Category not found"
            })
        }
        removeFile(subCategory.thumbnail);
        await SubCategoryModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            data: 'Delete sub category success'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error.message
        })
    }
}





