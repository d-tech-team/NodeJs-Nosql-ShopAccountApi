import { body } from "express-validator";

export const create = () => [
    body("name").notEmpty().withMessage("Name is required"),
]
