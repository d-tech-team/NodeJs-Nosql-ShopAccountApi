import { body } from "express-validator";

export const create = () => [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("type").notEmpty().withMessage("Type is required").isIn(["random", "normal"]).withMessage("Type is invalid"),
    body("subCategoryId").notEmpty().withMessage("Sub Category is required"),
]