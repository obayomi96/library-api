import { check } from 'express-validator';

const validateBook = [
  check('name', 'A valid name is required')
    .exists()
    .isString()
    .isLength({ min: 3 }),
  check('author', "A valid author's name is required")
    .exists()
    .isString()
    .isLength({ min: 3 }),
  check('pages', 'A valid number of pages is required')
    .exists()
    .isNumeric(),
];

export default validateBook;
