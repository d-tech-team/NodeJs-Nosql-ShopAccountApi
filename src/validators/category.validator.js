import { body } from "express-validator";

const create = () => [
    body("name").notEmpty().withMessage("Name is required"),
    body("slug").notEmpty().withMessage("Slug is required"),
    body("thumbnail").notEmpty().withMessage("Thumbnail is required"),
    body("userId").notEmpty().withMessage("UserId is required"),
]

module.exports = {
    create,
}