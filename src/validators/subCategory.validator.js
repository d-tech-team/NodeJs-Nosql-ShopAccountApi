import { body } from "express-validator";

export const create = () => [
    body("name").notEmpty().withMessage("Name is required"),
    body("type").notEmpty().withMessage("Type is required").isIn(["normal", "random", "wheel"]).withMessage("Type is invalid"),
    body("categoryId").notEmpty().withMessage("Category is required"),
]
