import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import database from "./config/database.js";
import expressRouterGroup from "express-router-group";
const app = express();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

export default app;