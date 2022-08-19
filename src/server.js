import app from './app.js';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import CategoryRouter from './routes/category.route.js';
import SubCategoryRouter from './routes/subCategory.route.js';
import AccountRouter from './routes/account.route.js';
import AuthRouter from './routes/auth.route.js';
import HistoryBuyRouter from './routes/historyBuy.route.js';
import "./config/database.js";
import './utils/passport.util.js';
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'keyboard cat',
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7
     },
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.group('/api', (router) => {
    router.use('/categories', CategoryRouter);
    router.use('/subcategories', SubCategoryRouter);
    router.use('/accounts', AccountRouter);
    router.use('/auth', AuthRouter);
    router.use('/buy', HistoryBuyRouter);
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


