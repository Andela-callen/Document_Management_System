import dotenv from 'dotenv';
import supertest from 'supertest';
import should from 'should';
import chai from 'chai';
import jwt from'jsonwebtoken';
import db from  '../models/';
import app from '../config/express';
import helper from '../test/testHelper/user.helper';

dotenv.config();

//const secretKey = process.env.SECRET || 'loveEveryoneStayPeaceful&Explore';
const expect = chai.expect;
const request = supertest(app);

describe('Roles', () => {
  let user, token, adminRole, newRole, userDetails;

  before((done) => {
    user = helper.users;
    db.Role.sequelize.sync({ force: true})
     .then(() => {
       db.Role.bulkCreate([helper.adminRole, helper.regularRole], {
         returning: true
       }).then((newRole) => {
         adminRole = newRole[0];
         user.roleId = adminRole.id;
         request
          .post('/users/')
          .send(user)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
       });
     });
  });

  after((done) => {
    db.User.sequelize.sync({ force: true}).then(() => {
      db.Role.sequelize.sync({ force: true }).then(() => {
        done();
      });
    });
  });

describe('Create Role POST /roles/', () => {
  it('should create a new role if not existing',
    (done) => {
      request
        .post('/roles')
        .send({ title: 'newRole' })
        .set('authorization', token)
        .end((err, res) => {
          if(err) return done(err);
          newRole = res.body;
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should return an error if role already exists',
      (done) => {
        request
         .post('/roles/')
         .send({ title: 'Admin' })
         .set('authorization', token)
         .end((err, res) => {
           if (err) return done(err);
           expect(res.status).to.equal(409);
           done();
         });
      });

      it('should return an error if no title is passed', (done) => {
      request
        .post('/roles/')
        .send({})
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('GET all roles: /roles/', () => {
    it('should return all roles', (done) => {
      request
      .get('/roles?limit=2&offset=1')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.pagination.totalCount).to.equal(3);
        expect(res.body.result.length).to.equal(2);
        done();
      });
    });
  });

  describe('Update a role PUT: /roles/:id', () => {
    it('should update role if it exists', (done) => {
      request
        .put('/roles/2')
        .send({ title: 'changedRole' })
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return error if role does not exist', (done) => {
      request
        .get('/roles/8')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should return an error if role is an Admin role', (done) => {
      request
        .put('/roles/1')
        .send({ title: 'changedRole' })
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('Delete a role DELETE: /roles/:id', () => {
    it('should delete role if it exists', (done) => {
      request
        .delete('/roles/2')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return an error if role does not exists', (done) => {
      request
        .delete('/roles/10')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should return an error if it is an admin role', (done) => {
      request
        .delete('/roles/1')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
});