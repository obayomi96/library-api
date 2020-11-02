import Book from '../models/book';
import { jsonResponse } from '../utils/helpers';

const { sendSuccess, sendError } = jsonResponse;

export const find = async (req, res) => {
  const books = await Book.find().sort('-createdAt');
  if (books.length === 0) {
    return sendError(res, 404, 'There are no books in this library');
  }
  return sendSuccess(res, 200, 'Succesfully retrieved all books', { books });
};

export const findOne = async (req, res) => {
  const {
    params: { id },
  } = req;
  const book = await Book.findById(id);
  if (!book) {
    return sendError(res, 404, 'This book does not exist in this library');
  }
  return sendSuccess(res, 200, 'Successfully retrieved book', { book });
};

export const create = async (req, res) => {
  const { body } = req;

  const bookExists = await Book.findOne({ name: body.name });
  if (bookExists) {
    return sendError(res, 409, 'This book already exists in this library');
  }

  const book = await Book.create({
    ...body,
  });
  return sendSuccess(res, 201, 'Successfully added new book to library', {
    book,
  });
};

export const update = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const bookExists = await Book.findById(id);
  if (!bookExists) {
    return sendError(res, 404, 'This book does not exist in this library');
  }

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { ...body },
    { new: true },
  );
  return sendSuccess(res, 201, 'Successfully updated book in library', {
    book: updatedBook,
  });
};

export const remove = async (req, res) => {
  await Book.deleteMany({});
  return sendSuccess(res, 204);
};

export const removeOne = async (req, res) => {
  const {
    params: { id },
  } = req;
  await Book.findByIdAndDelete(id);
  return sendSuccess(res, 204);
};
