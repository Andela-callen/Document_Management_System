import dotenv from 'dotenv';
import supertest from 'supertest';
import should from 'should';
import chai from 'chai';
import jwt from'jsonwebtoken';
import db from  '../models/';
import app from '../config/express';
import helper from '../test/testHelper/helper'

dotenv.config();
const secretKey = process.env.SECRET || 'loveEveryoneStayPeaceful&Explore';
const expect = chai.expect;
const request = supertest(app);



describe('User Suite', () => {
  let  user, secondUser, thirdUser, token, updateDetails, userDetails, userAdmin, deleteUser;

  let userToken, adminRole, regularRole;

  before((done) => {
    user = helper.users;
    secondUser = helper.secondUser;
    thirdUser = helper.thirdUser;

    db.Role.bulkCreate([helper.adminRole, helper.regularRole], {returning: true
    }).then ((newRole) => {
      adminRole = newRole[0];
      regularRole = newRole[1];
      secondUser.roleId = regularRole.id;
      thirdUser.roleId = regularRole.id;
      user.roleId = adminRole.id;

      request.post('/users/')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          userAdmin = res.body.user;
          console.log('aklsjadkljadlkjads' + userAdmin)
          deleteUser = res.body.user.id;
          done();
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


describe('create Regular and POST /users/', () => {
  it('should create a second user as a Regular user',
    (done) => {
      request
        .post('/users/')
        .send(secondUser)
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('User successfully created')
          done();
        })
      })
  });


describe('create Regular and GET', () => {
  it('should successfully get all users',
    (done) => {
      request
        .get('/users/')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.pagination.totalCount).to.equal(2);
          expect(res.body.msg).to.equal('Success');
          done();
        });
    });   
  //login (try using describe)
  it('should return an error if there is no token during login',
    (done) => {
      request
        .get('/users/login')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('No token provided.');
          done();
        });
      });
  
  //login (try using describe)
  it('should return error if server error occurs during login',
    (done) => {
      request
        .get('/users/login')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(500);
          done();
        });
    });
  });

  describe('Update user PUT: /users/:id',() => {
    let userId, secondToken;
    before((done) => {
      jwt.verify(token, secretKey, (err, result) => {
        userId = result.userId;
        
      });
      request
        .post('/users/login')
        .send(secondUser)
        .end((err, res) => {
          secondToken = res.body.token;
          done();
        });
    });

    it('should update the user\'s details for the admin or owner', (done) => {
      request
        .put('/users/2')
        .set('authorization', token)
        .send(updateDetails)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return an error if updating a non-existing user',
      (done) => {
        request
          .put('/users/8')
          .set('authorization', token)
          .send(updateDetails)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(404);
            expect(res.body.msg).to.equal(`User not found`);
            done();
          });
      });
  });

  describe('Delete user: /users/:id',() => {
    let deleteUser, token;
    before((done) => {
      request
        .post('/users/login')
        .send(secondUser)
        .end((err, res) => {
          deleteUser = res.body.user.id;
          token = res.body.token;
          done();
        });
    });

    it('should return an error when trying to delete the admin', (done) => {
      request
        .delete('/users/1')
        .set('Authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('You cannot delete the Admin');
          done();
        });
    });

    it('should delete a role if the role exists', (done) => {
      request
        .delete('/roles/2')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('Role deleted');
          done();
        });
    });
  });
});