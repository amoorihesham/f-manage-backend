import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import authRouter from './src/modules/auth/auth.routes.js';
import usersRouter from './src/modules/users/users.routes.js';
import productsRouter from './src/modules/products/products.routes.js';
import categoriesRouter from './src/modules/categories/categories.routes.js';
import subCategoriesRouter from './src/modules/subCategories/subCategories.routes.js';
import bannersRouter from './src/modules/banners/banners.routes.js';
import brandsRouter from './src/modules/brands/brands.routes.js';
import ordersRouter from './src/modules/orders/orders.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(authRouter);
app.use(usersRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(subCategoriesRouter);
app.use(bannersRouter);
app.use(brandsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => console.log('App Running ==> ', process.env.PORT));
