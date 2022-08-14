import express from "express";
const Router = express.Router();
import {
    list,
    get,
    create,
    update,
    remove
} from "../controllers/category.controller.js";
import { create as createValidator } from '../validators/category.validator.js';
import uploadSingleUltil from "../utils/uploadSingle.util.js";
import { isLogin, isAdmin } from '../middlewares/permission.middleware.js';

Router.get("/", list)

Router.get("/:id", get)

Router.post("/", isLogin, isAdmin, uploadSingleUltil, createValidator(), create)

Router.patch("/:id", isLogin, isAdmin, uploadSingleUltil, createValidator(), update)

Router.delete("/:id", isLogin, isAdmin, remove)

export default Router; 