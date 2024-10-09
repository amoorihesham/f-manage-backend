import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import userRouter from './src/modules/user/user.routes.js';
import productsRouter from './src/modules/products/products.routes.js';
import categoriesRouter from './src/modules/categories/categories.routes.js';
import subCategoriesRouter from './src/modules/subCategories/subCategories.routes.js';
import bannersRouter from './src/modules/banners/banners.routes.js';
import brandsRouter from './src/modules/brands/brands.routes.js';
import ordersRouter from './src/modules/orders/orders.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(userRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(subCategoriesRouter);
app.use(bannersRouter);
app.use(brandsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => console.log('App Running ==> ', process.env.PORT));
