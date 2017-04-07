import dotenv from 'dotenv';
import supertest from 'supertest';
import should from 'should';
import chai from 'chai';
import jwt from'jsonwebtoken';
import db from  '../models/';
import app from '../config/express';
import helper from '../test/testHelper/user.helper';

dotenv.config();
const secretKey = process.env.SECRET || 'loveEveryoneStayPeaceful&Explore';
const expect = chai.expect;
const request = supertest(app);



describe('User Suite', () => {
  let  user, secondUser, thirdUser, fourthUser, token, updateDetails, userDetails, userAdmin, deleteUser;

  let userToken, adminRole, regularRole;

  before((done) => {
    user = helper.users;
    secondUser = helper.secondUser;
    thirdUser = helper.thirdUser;
    fourthUser = helper.fourthUser;

    db.Role.bulkCreate([helper.adminRole, helper.regularRole], {returning: true
    }).then ((newRole) => {
      adminRole = newRole[0];
      regularRole = newRole[1];
      secondUser.roleId = regularRole.id;
      thirdUser.roleId = regularRole.id;
      fourthUser.roleId = regularRole.id;
      user.roleId = adminRole.id;

      request.post('/api/users/')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          userAdmin = res.body.user;
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
  let usertoken, userDetails, user;
  it('should create a second user as a Regular user',
    (done) => {
      request
        .post('/api/users/')
        .send(secondUser)
        .end((err, res) => {
          usertoken = res.body.token;
          userDetails = res.body.user.userId;
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('User successfully created')
          done();
        });
      });
    
    it('returns an error if creating an already existing user',
      (done) => {
        request
          .post('/api/users/')
          .send(secondUser)
          .set('authorization', usertoken)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(409);
            done();
          });
      });
  });


describe('Get User GET: /users/:id', () => {
  let userToken, userDetails;
  before((done) => {
    request
      .post('/api/users/')
      .send(thirdUser)
      .end((err, res) => {
        if (err) return done(err);
        userToken = res.body.token;
        userDetails = res.body.user.userId;
        done();
      });
  });

  it('should return an error if login fails and user is not found', (done) => {
      request
        .post(`/api/users/login/${userDetails * 5}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });

  it('should return an error if there is no token during login',
    (done) => {
      request
        .get('/api/users/login')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('No token provided.');
          done();
        });
      });

  it('should successfully get all users if Admin',
    (done) => {
      request
        .get('/api/users/')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.pagination.totalCount).to.equal(3);
          expect(res.body.msg).to.equal('Success');
          done();
        });
    });

   it('returns the details of the particular user', (done) => {
      request
        .get(`/api/users/${userDetails}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it(`should successfully get all users if the user has
        admin role with pagination`, (done) => {
      request
        .get('/api/users?limit=2&offset=1')
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.pagination.totalCount).to.equal(3);
          expect(res.body.users[0].firstName).to.equal(userAdmin.firstName);
          done();
        });
    });

    it('should return not found if the user does not exist', (done) => {
      request
        .get(`/api/users/${userDetails * 5}`)
        .set('authorization', userToken)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('User does not exist in the database');
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
        .post('/api/users/login')
        .send(secondUser)
        .end((err, res) => {
          secondToken = res.body.token;
          userDetails = res.body.user;
          done();
        });
    });

    it('should update the user\'s details for the admin or owner', (done) => {
      request
        .put(`/api/users/${userDetails.userId}`)
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
          .put(`/api/users/${userId * 8}`)
          .set('authorization', token)
          .send(updateDetails)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(404);
            expect(res.body.msg).to.equal(`User not found`);
            done();
          });
      });

    it('should return an error if the user is not an admin or owner', (done) => {
      request
        .put(`/api/users/${userId}`)
        .set('authorization', secondToken)
        .send(updateDetails)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not permit regular user update their roles',
      (done) => {
        request
          .put(`/api/users/${userDetails.id}`)
          .set('authorization', secondToken)
          .send({ RoleId: adminRole.id })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(403);
            expect(res.body.msg).to.equal("You are not authorized to update user");
            done();
          });
      });
  });

  describe('Delete user: /users/:id',() => {
    let deleteUser, deleteToken;
    before((done) => {
      request
        .post('/api/users/login')
        .send(secondUser)
        .end((err, res) => {
          deleteUser = res.body.user;
          deleteToken = res.body.token;
          done();
        });
    });

    it('should return an error when trying to delete the admin', (done) => {
      request
        .delete(`/api/users/${userAdmin.userId}`)
        .set('authorization', deleteToken)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('You cannot delete the Admin');
          done();
        });
    });


    it('should delete a user', (done) => {
      request
        .delete(`/api/users/${deleteUser.userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return an error if admin is trying to delete admin', (done) => {
      request
        .delete(`/api/users/${userAdmin.userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });
   });
});