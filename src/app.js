import 'dotenv/config'
import 'module-alias/register.js'
import express from "express";
import 'express-group-routes'
import { currentDate, currentTime } from './utils/date.util.js'
const app = express();


app.use('./uploads/', express.static('uploads'));

export default app;