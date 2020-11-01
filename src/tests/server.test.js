import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Books API Server', () => {
  it('should respond with status code 200 when the base route is requested', done => {
    chai
      .request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res)
          .to.have.property('status')
          .to.eql(200);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('String')
          .to.eql('Welcome to Books, please visit /api/v1');
        done();
      });
  });

  it('should respond with status code 404 at /api/v1 if route does not exist', done => {
    chai
      .request(app)
      .get('/booksapi')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res)
          .to.have.property('status')
          .to.eql(404);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('String')
          .to.eql('A beast ate this page...');
        done();
      });
  });

  it('should respond with status code 200 when the version route is requested', done => {
    chai
      .request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res)
          .to.have.property('status')
          .to.eql(200);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('String')
          .to.eql('Welcome to Books API version 1');
        done();
      });
  });
});
