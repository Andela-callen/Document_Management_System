import dotenv from 'dotenv';
import 'babel-polyfill';
import chai from 'chai';
import supertest from 'supertest';
import db from  '../models/';
import app from '../config/express';
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
          console.log(adminUserResult)
          token = res.body.token;
          sampleDoc.first.id = adminUserResult.userId;
          request
            .post('/api/documents/')
            .send(sampleDoc.first)
            .set('authorization', token)
            .end((err, res) => {
              adminDocument = res.body;
              console.log()
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
        .delete(`/api/documents/${6}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          request
            .get('/api/documents')
            .set('authorization', token)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(404);
              done();
            });
        });
    });
  });


});
