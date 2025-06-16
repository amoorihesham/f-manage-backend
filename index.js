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
import dbConnect from './db/connection.js';

dotenv.config({ path: ['.env', '.env.local', '.env.development', '.env.production'] });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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

app.listen(process.env.PORT || 5123, async () => {
  await dbConnect();
  console.log(`
  -----------********** Server Started Successfully **********------------------
  ----------- Current Port : [ ${process.env.PORT} ] -----------
  ----------- Frontend Origin : [ ${process.env.FRONTEND_URL} ] -----------
  ----------- Current Environment : [ ${process.env.NODE_ENV} ] -----------
  ----------- Connected Database : [ ${process.env.NODE_ENV === 'production' ? 'Mongodb Atlas' : 'Local Database'} ]
  -----------*************************************************------------------\n
  `);
});
