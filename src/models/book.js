import { Schema, model } from 'mongoose';
import { accessibleRecordsPlugin } from '@casl/mongoose';

const Book = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

Book.plugin(accessibleRecordsPlugin);

export default model('Book', Book);
