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
import uploadSingleUltil from "../utils/uploadSingle.util.js";
import { isLogin, isAdmin } from '../middlewares/permission.middleware.js';

Router.get("/", list)

Router.get("/:id", get)

Router.post("/", isLogin, isAdmin, uploadSingleUltil, createValidator(), create)

Router.patch("/:id", uploadSingleUltil, createValidator(), update)

Router.delete("/:id", remove)

export default Router;