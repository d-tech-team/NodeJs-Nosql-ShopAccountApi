import CategoryModel from "../models/Category";
import { validationResult } from "express-validator";

const list = async (req, res) => { }

const get = async (req, res) => { }

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
}

const update = async (req, res) => { }

const remove = async (req, res) => { }