import { Router } from 'express';

import bookRouter from './book';
import { jsonResponse } from '../utils/helpers';

const { sendSuccess } = jsonResponse;

const routes = Router();

routes.get('/', (req, res) =>
  sendSuccess(res, 200, 'Welcome to Books API version 1'),
);
routes.use('/books', bookRouter);

export default routes;
