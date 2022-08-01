//import app from './app.js';
import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import 'express-group-routes'
import morgan from 'morgan';
import bodyParser from 'body-parser';
import CategoryRouter from './routes/category.route.js';
import SubCategoryRouter from './routes/subCategory.route.js';
import AccountRouter from './routes/account.route.js';
import "./config/database.js";
const app = express();
const { PORT } = process.env;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('./uploads/', express.static('uploads'));

app.group('/api', (router) => {
    router.use('/categories', CategoryRouter);
    router.use('/subcategories', SubCategoryRouter);
    router.use('/accounts', AccountRouter);
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

