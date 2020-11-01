import { Router } from 'express';

import {
  find,
  findOne,
  create,
  update,
  remove,
  removeOne,
} from '../controllers/book';

import Validator from '../middlewares';

const bookRouter = Router();

const { handleValidation, validateBook } = Validator;

bookRouter.get('/', find);
bookRouter.get('/:id', findOne);
bookRouter.post('/', validateBook, handleValidation, create);
bookRouter.put('/:id', validateBook, handleValidation, update);
bookRouter.delete('/', remove);
bookRouter.delete('/:id', removeOne);

export default bookRouter;
