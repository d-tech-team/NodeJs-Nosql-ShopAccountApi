import express from "express";
const Router = express.Router();
import {
    list,
    get,
    create,
    update,
    remove
} from "../controllers/subCategory.controller.js";
import { create as createValidator } from '../validators/subCategory.validator.js';
import uploadSingleUltil from "../ultils/uploadSingle.ultil.js";

Router.get("/", list)

Router.get("/:id", get)

Router.post("/", uploadSingleUltil, create)

Router.patch("/:id", uploadSingleUltil, update)

Router.delete("/:id", remove)

export default Router;