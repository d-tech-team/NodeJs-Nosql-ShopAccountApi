import express from "express";
const Router = express.Router();
import {
    list,
    get,
    create,
    update,
    remove
} from "../controllers/account.controller.js";
import uploadMultiUltil from "../ultils/uploadMulti.ultil.js";

Router.get("/", list)

Router.get("/:id", get)

Router.post("/", uploadMultiUltil, create)

Router.patch("/:id", update)

Router.delete("/:id", remove)



export default Router;