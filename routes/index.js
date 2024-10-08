import { Router } from 'express';

import productsRouter from './products.router.js';
import categoriesRouter from './categories.router.js';
import usersRouter from './users.router.js';
import orderRouter from './orders.router.js';
import customersRouter from './customers.router.js';
import authRouter from './auth.router.js';

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
}

export default routerApi;
