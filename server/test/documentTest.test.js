import dotenv from 'dotenv';
import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import db from  '../models';
import app from '../server';
import helper from '../test/testHelper/user.helper';
import sampleDoc from'../test/testHelper/document.helper';

dotenv.config();

const expect = chai.expect;
const request = supertest(app);

describe('Document suite', () => {
  let token, userToken;
  let adminDoc, adminDocument, secondUserResult, adminUserResult;
  let adminRole, regularRole;
  before((done) => {
    db.Role.bulkCreate([helper.adminRole, helper.regularRole], {
      returning: true
    }).then((newRoles) => {
      adminRole = newRoles[0];
      regularRole = newRoles[1];
      helper.secondUser.roleId = regularRole.id;
      helper.thirdUser.roleId = regularRole.id;
      helper.users.roleId = adminRole.id;

      request.post('/api/users/')
        .send(helper.users)
        .end((err, res) => {
          adminUserResult = res.body.user;
          token = res.body.token;
          sampleDoc.first.userId = adminUserResult.userId;
          console.log(sampleDoc.first)
          request
            .post('/api/documents/')
            .send(sampleDoc.first)
            .set('authorization', token)
            .end((err, res) => {
              adminDocument = res.body;
              done();
            });
        });
    });
  });

  after((done) => {
    db.Document.sequelize.sync({ force: true }).then(() => {
      db.User.sequelize.sync({ force: true }).then(() => {
        db.Role.sequelize.sync({ force: true }).then(() => {
          done();
        });
      });
    });
  });

  describe('Get non-existing documents GET: /api/documents/:id', () => {
    it('returns an error to the admin if no documents exists', (done) => {
      request
        .delete(`/api/documents/${adminDocument.doc.id}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          request
            .get('/api/documents/')
            .set('authorization', token)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(404);
              done();
            });
        });
    });
  // it('returns an error to a user if no document exists', (done) => {
  //     request
  //       .post('/api/users/')
  //       .send(helper.secondUser)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         userToken = res.body.token;
  //         secondUserResult = res.body.user;
  //         request
  //           .get('/api/documents/')
  //           .set('authorization', userToken)
  //           .end((err, res) => {
  //             if (err) return done(err);
  //             expect(res.status).to.equal(404);
  //             done();
  //           });
  //       });
  //   });

  //    it('returns an error if a user has no document', (done) => {
  //     request
  //       .get(`/api/users/${secondUserResult.userId}/documents`)
  //       .set('authorization', userToken)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //   });

  //   it('returns an error to the admin if a user has no document', (done) => {
  //     request
  //       .get(`/api/users/${secondUserResult.userId}/documents/`)
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //   });
  });
  
  // describe('Create Document POST: /api/documents/', () => {
  //   it('should create a document successfully', (done) => {
  //     request
  //       .post('/api/documents/')
  //       .send(sampleDoc.first)
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         adminDoc = res.body;
  //         expect(res.status).to.equal(201);
  //         expect(res.body).to.be.defined;
  //         expect(res.body.title).to.be.defined;
  //         done();
  //       });
  //   });

  //   it('should not create a document if the user is not logged in', (done) => {
  //     request
  //       .post('/api/documents/')
  //       .send(sampleDoc.first)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(403);
  //         done();
  //       });
  //   });

  //   it('should return an error if any field is missing', (done) => {
  //     request
  //       .post('/api/documents/')
  //       .send(sampleDoc.badDoc)
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(500);
  //         done();
  //       });
  //   });
  // });

  // describe('Get All Document GET: /api/documents/', () => {
  //   let secondToken;
  //   before((done) => {
  //     request
  //     .post('/api/users/login')
  //     .send(helper.secondUser)
  //     .end((err, res) => {
  //       secondToken = res.body.token;
  //       request
  //         .post('/api/documents/')
  //         .send(sampleDoc.second)
  //         .set('authorization', secondToken)
  //         .end((err, res) => {
  //           if (err) done(err);
  //           done();
  //         });
  //     });
  //   });

  //   it('should get all documents if the user is an admin', (done) => {
  //     request
  //       .get('/api/documents')
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('Get Document GET: /api/documents/:id', () => {
  //   let secondToken, result2;
  //   before((done) => {
  //     request
  //       .post('/api/users/login')
  //       .send(helper.secondUser)
  //       .end((err, res) => {
  //         secondToken = res.body.token;
  //         done();
  //       });
  //   });

  //   it('returns the document if the document has public access', (done) => {
  //     request
  //       .get(`/api/documents/${adminDoc.doc.id}`)
  //       .set('authorization', secondToken)
  //       .end((err, res) => {
  //         if (err) done(err);
  //         expect(res.status).to.equal(200);
  //         done();
  //       });
  //   });

  //   it('returns an error if the document does not exist', (done) => {
  //     console.log("-----I AM HERE---------", adminDoc)
  //     request
  //       .get(`/api/documents/${adminDoc.doc.id * 8}`)
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         if (err) done(err);
  //         expect(res.status).to.equal(404);
  //         done();
  //       });
  //   });

  //   it('returns an error if the document has private access', (done) => {
  //     request
  //       .post('/api/documents/')
  //       .send(sampleDoc.third)
  //       .set('authorization', token)
  //       .end((err, res) => {
  //         if (err) done(err);
  //         result2 = res.body;
  //         request
  //           .get(`/api/documents/${result2.doc.id}`)
  //           .set('authorization', secondToken)
  //           .end((err, res) => {
  //             if (err) done(err);
  //             expect(res.status).to.equal(403);
  //             done();
  //           });
  //       });
  //   });

  //   it('returns the document if the document belongs to the user', (done) => {
  //     request
  //       .post('/api/users/login')
  //       .send(helper.secondUser)
  //       .end((err, res) => {
  //         request
  //           .post('/api/documents')
  //           .send(sampleDoc.third)
  //           .set('authorization', res.body.token)
  //           .end((err, res) => {
  //             const doc = res.body;
  //             request
  //               .get(`/api/documents/${doc.doc.id}`)
  //               .set('authorization', secondToken)
  //               .end((err, res) => {
  //                 if (err) done(err);
  //                 expect(res.status).to.equal(200);
  //                 done();
  //               });
  //           });
  //       });
  //   });
  // });



  });
