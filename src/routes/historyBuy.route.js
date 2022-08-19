import express from "express";
const Router = express.Router();
import {
    list
} from "../controllers/historyBuy.controller.js";

Router.get("/", list)


export default Router;