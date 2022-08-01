import 'dotenv'
import express from "express";
const app = express();
import "./config/database.js";

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

export default app;