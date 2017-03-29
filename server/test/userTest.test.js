import dotenv from 'dotenv';
import supertest from 'supertest';
import should from 'should';
import chai from 'chai';
import jwt from'jsonwebtoken';
import db from  '../models/';
import app from '../config/express';
import helper from '../test/testHelper/user.helper';
import sampleDoc from'../test/testHelper/document.helper';

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

      request.post('/users/')
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
        .post('/users/')
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
          .post('/users/')
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
      .post('/users/')
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
        .post(`/users/login/${userDetails * 5}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
    });

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

  it('should successfully get all users if Admin',
    (done) => {
      request
        .get('/users/')
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
        .get(`/users/${userDetails}`)
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
        .get('/users?limit=2&offset=1')
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
        .get(`/users/${userDetails * 5}`)
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
    let userId, secondToken, userDetails;
    before((done) => {
      jwt.verify(token, secretKey, (err, result) => {
        userId = result.userId;
        
      });
      request
        .post('/users/login')
        .send(secondUser)
        .end((err, res) => {
          secondToken = res.body.token;
          userDetails = res.body.user;
          done();
        });
    });

    it('should update the user\'s details for the admin or owner', (done) => {
      request
        .put(`/users/${userDetails.userId}`)
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
          .put(`/users/${userId * 8}`)
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
        .put(`/users/${userId}`)
        .set('authorization', secondToken)
        .send(updateDetails)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not permit regular user access admin roles',
      (done) => {
        request
          .put(`/users/${userDetails.id}`)
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
        .post('/users/login')
        .send(secondUser)
        .end((err, res) => {
          deleteUser = res.body.user;
          deleteToken = res.body.token;
          done();
        });
    });

    it('should return an error when trying to delete the admin', (done) => {
      request
        .delete(`/users/${userAdmin.userId}`)
        .set('authorization', deleteToken)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('You cannot delete the Admin');
          done();
        });
    });

    xit('should return an error if the user does not have admin role',
      (done) => {
        request
          .delete(`/users/${deleteUser.userId}`)
          .set('authorization', deleteToken)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(403);
            done();
          });
      });

    it('should delete a user', (done) => {
      request
        .delete(`/users/${deleteUser.userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return an error if admin is trying to delete admin', (done) => {
      request
        .delete(`/users/${userAdmin.userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          done();
        });
    });

    xit('should return an error if the user does not exist', (done) => {
      request
        .delete(`/users/${deleteUser.userId}`)
        .set('authorization', deleteToken)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.msg).to.equal(`User not found`)
          done();
        });
    });
   });

  //   describe('Get A User\'s Documents GET: /users/:id/documents', () => {
  //   let userResult, secondToken;
  //   before((done) => {
  //     request
  //       .post('/users/login')
  //       .send(secondUser)
  //       .end((err, res) => {
  //         secondToken = res.body.token;
  //         userResult = res.body.user;
  //         request
  //           .post('/documents/')
  //           .send(sampleDoc.first)
  //           .set('authorization', secondToken)
  //           .end((err, res) => {
  //             done();
  //           });
  //       });
  //     });

  //     it('returns all documents that belongs to a user', (done) => {
  //     request
  //       .get(`/users/${userResult.id}/documents?limit=2&offset=1`)
  //       .set('authorization', secondToken)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.pagination.totalCount).to.equal(4);
  //         expect(res.body.result.length).to.equal(2);
  //         done();
  //       });
  //   });
  // });
});