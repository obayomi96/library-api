import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import {
  book,
  anotherBook,
  updatedBook,
  bookWithoutName,
  bookWithoutAuthor,
  bookWithoutPages,
} from './mocks/book.mockdata';
import Book from '../models/book';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let bookId = '';

describe('Books Module', () => {
  describe('Book Creation and Update Block', () => {
    before(() => {
      return Book.deleteMany({});
    });

    it('should respond with status code 200 and add a book to the library', done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(book)
        .end((err, res) => {
          bookId = res.body.book._id;
          expect(res)
            .to.have.property('status')
            .to.eql(201);
          expect(res.body)
            .to.have.property('status')
            .to.eql('success');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('Successfully added new book to library');
          expect(res.body)
            .to.have.property('book')
            .to.be.an('Object');
          expect(res.body.book)
            .to.have.property('name')
            .to.be.an('String')
            .to.eql(book.name);
          expect(res.body.book)
            .to.have.property('author')
            .to.be.an('String')
            .to.eql(book.author);
          expect(res.body.book)
            .to.have.property('pages')
            .to.be.a('Number')
            .to.eql(book.pages);
          done();
        });
    });

    it('should respond with status code 200 and add another book to the library', done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(anotherBook)
        .end((err, res) => {
          bookId = res.body.book._id;
          expect(res)
            .to.have.property('status')
            .to.eql(201);
          expect(res.body)
            .to.have.property('status')
            .to.eql('success');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('Successfully added new book to library');
          expect(res.body)
            .to.have.property('book')
            .to.be.an('Object');
          expect(res.body.book)
            .to.have.property('name')
            .to.be.an('String')
            .to.eql(anotherBook.name);
          expect(res.body.book)
            .to.have.property('author')
            .to.be.an('String')
            .to.eql(anotherBook.author);
          expect(res.body.book)
            .to.have.property('pages')
            .to.be.a('Number')
            .to.eql(anotherBook.pages);
          done();
        });
    });

    it('should respond with a duplicate error if book already exists in library', done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(book)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(409);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('This book already exists in this library');
          done();
        });
    });

    it('should respond throw a specific error if name is not provided in the request data', done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(bookWithoutName)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql('A valid name is required');
          done();
        });
    });

    it("should respond throw a specific error if author's name is not provided in the request data", done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(bookWithoutAuthor)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql(
            "A valid author's name is required",
          );
          done();
        });
    });

    it('should respond throw a specific error if number of pages is not provided in the request data', done => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/json')
        .send(bookWithoutPages)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql(
            'A valid number of pages is required',
          );
          done();
        });
    });

    it('should respond with status code 201 and update a book in the library', done => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .send(updatedBook)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(201);
          expect(res.body)
            .to.have.property('status')
            .to.eql('success');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('Successfully updated book in library');
          expect(res.body)
            .to.have.property('book')
            .to.be.an('Object');
          expect(res.body.book)
            .to.have.property('name')
            .to.be.an('String')
            .to.eql(updatedBook.name);
          expect(res.body.book)
            .to.have.property('author')
            .to.be.an('String')
            .to.eql(updatedBook.author);
          expect(res.body.book)
            .to.have.property('pages')
            .to.be.a('Number')
            .to.eql(updatedBook.pages);
          done();
        });
    });

    it('should respond with a not found error if book does not exists in library', done => {
      chai
        .request(app)
        .put('/api/v1/books/5f9796126f7b6d541607d37e')
        .set('Accept', 'application/json')
        .send(updatedBook)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(404);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('This book does not exist in this library');
          done();
        });
    });

    it('should respond throw a specific error if name is not provided in the request data', done => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .send(bookWithoutName)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql('A valid name is required');
          done();
        });
    });

    it("should respond throw a specific error if author's name is not provided in the request data", done => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .send(bookWithoutAuthor)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql(
            "A valid author's name is required",
          );
          done();
        });
    });

    it('should respond throw a specific error if number of pages is not provided in the request data', done => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .send(bookWithoutPages)
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(400);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.an('array');
          expect(res.body.message[0]).to.eql(
            'A valid number of pages is required',
          );
          done();
        });
    });
  });

  describe('Book Find Block', () => {
    it('should return an array of all books in the library', done => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(200);
          expect(res.body)
            .to.have.property('status')
            .to.eql('success');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('Succesfully retrieved all books');
          expect(res.body)
            .to.have.property('books')
            .to.be.an('array');
          done();
        });
    });

    it('should return a object of a single book in the library', done => {
      chai
        .request(app)
        .get(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(200);
          expect(res.body)
            .to.have.property('status')
            .to.eql('success');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('Successfully retrieved book');
          expect(res.body)
            .to.have.property('book')
            .to.be.an('Object');
          expect(res.body.book)
            .to.have.property('name')
            .to.be.an('String')
            .to.eql(updatedBook.name);
          expect(res.body.book)
            .to.have.property('author')
            .to.be.an('String')
            .to.eql(updatedBook.author);
          expect(res.body.book)
            .to.have.property('pages')
            .to.be.a('Number')
            .to.eql(updatedBook.pages);
          done();
        });
    });

    it('should return a not found error if book does not exist in the library', done => {
      chai
        .request(app)
        .get('/api/v1/books/5f9796126f7b6d541607d37e')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(404);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('This book does not exist in this library');
          done();
        });
    });
  });

  describe('Book Delete && Empty Collection Block', () => {
    it('should return no response and status code of 204 and delete a single book from the library', done => {
      chai
        .request(app)
        .delete(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(204);
          done();
        });
    });

    it('should return no response and status code of 204 and delete all books from the library', done => {
      chai
        .request(app)
        .delete('/api/v1/books/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(204);
          done();
        });
    });

    it('should return a not found error if there no books in the library', done => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res)
            .to.have.property('status')
            .to.eql(404);
          expect(res.body)
            .to.have.property('status')
            .to.eql('error');
          expect(res.body)
            .to.have.property('message')
            .to.be.a('String')
            .to.eql('There are no books in this library');
          done();
        });
    });
  });
});
