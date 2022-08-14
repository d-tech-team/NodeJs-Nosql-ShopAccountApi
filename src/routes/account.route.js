import express from "express";
const Router = express.Router();
import {
    list,
    get,
    create,
    update,
    remove
} from "../controllers/account.controller.js";
import uploadMultiUltil from "../utils/uploadMulti.util.js";
import { isLogin, isAdmin } from '../middlewares/permission.middleware.js';
import { create as createValidator } from '../validators/account.validator.js';


Router.get("/", list)

Router.get("/:id", get)

Router.post("/", isLogin, isAdmin, uploadMultiUltil, createValidator(), create)

Router.patch("/:id", isLogin, isAdmin, uploadMultiUltil, createValidator(), update)

Router.delete("/:id", remove)



export default Router;