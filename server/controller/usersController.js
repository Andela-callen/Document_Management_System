require('dotenv').config();
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonWebToken';
import helper from '../controller/helpers/helper';

const secretKey = process.env.SECRET;


class userController{
  static login(req, res) {
    db.User.findOne({ where: {username : req.body.username} })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password_digest)){
        const loginObject = {
          userId: user.id,
        username: user.username
      };
      const token =jwt.sign(loginObject, secretKey, {expiresIn:'24h'});
      user = helper.transformUser(user);
       return res.status(200).json({ msg: 'Login Successful', token, user});
      } else {
       return res.status(403).json({error: 'Login Failed'});
      }
    })
    .catch(() => {
      return res.status(404).json({msg: 'Account does not exist'});
     });
  }

  static logout(req, res) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) {
      return res.status(400).json({ msg: 'User not logged in before' });
    }

    return res.status(200).json({ msg: 'User successfully logged out' });
  }

  static createUser(req, res){
    let newUser = {};
    newUser.roleId = req.body.roleId;
    newUser.username = req.body.username;
    newUser.firstname = req.body.firstname;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.password_confirmation = req.body.password_confirmation;

    db.User.findAndCountAll({
      where: {
        $or: [
          { email: req.body.email},
          { roleId: 1 }]
      }
    }).then ((returnedUsers) => {
      const user = returnedUsers.rows;
      const checkEmail = helper.checkUser(user, 'email', req.body.email);
      const checkRoleId = helper.checkUser(user, 'roleId', Number(req.body.roleId));

      if(checkEmail) {
       return res.status(409).json({ msg: `This ${req.body.email} already exists`});
      } else if (checkRoleId){
       return res.status(409).json({msg: 'You do not have permission to create an Admin'})
      }
    
    db.User.create(newUser)
    .then((user) => {
      const userObject = {
        username: user.username,
        roleId: user.roleId,
        userId: user.id
      };
      const token =jwt.sign(userObject, secretKey, {expiresIn:'24h'});
      user = helper.transformUser(user);
       return res.status(201)
        .json({ msg: 'User successfully created', token,  user });
     })
    }).catch((err) => {
      return res.status(500).json({error: err.message});
    });
  }

  static instanceUsers(req, res){
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];

    db.User.findAndCountAll(query)
    .then((user) => {
      const offset = query.offset;
      const limit = query.limit;

      const pagination = helper.pagination(user, offset, limit);
      return res.status(200).json({ msg: 'Success', users: user.rows, pagination});
    })
  }

  static findUser(req, res) {
    db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        user = helper.transformUser(user)
        return res.status(200).json({ msg: user });
      } else {
        return res.status(404).json({ error: "User does not exist in the database"});
      }
    }).catch((err) => {
      return res.status(500).json({ msg: err.message });
    });
  }

  static updateUser(req, res) {
    const roleId = req.decoded.roleId;
    db.User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({msg: 'User not found'});
      }

      db.Role.findById(roleId)
       .then((role) => {
         if (role && role.title !== 'Admin') {
           req.body.roleId = user.roleId;
         }
         user.update(req.body).then((userUpdate) => {
           const updatedUser = helper.transformUser(userUpdate);
           return res.status(200).json({ msg: 'User updated' });
          }).catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      });
    });
  }

  static deleteUser(req, res){
    db.User.findOne({ where: { id: req.params.id } })
    .then((role) => {
      if (role) {
        db.User.findAndCountAll({ where: { roleId: role.id } })
          .then((user) => {
            const admin = user.rows[0].dataValues.id;
            if (user.count < 2 && admin === Number(req.params.id)){
              return res.status(403).json({ msg: 'You cannot delete the Admin'});
            }
            if (!user) {
              return res.status(404).json({ msg: `User ${req.params.id} not found` });
            }
            db.User.destroy({ where: { id: req.params.id } })
              .then((user) => {
                return res.status(200).json({ msg: 'User deleted' });
              });
          });
      }
    })
  }

  static findAllDocument(req, res){
    db.User.findOne({ where: { id: req.params.id }})
    .then((user) => {
      user.getDocuments().then((documents) => {
        return res.status(200).json({ msg: documents});
      })
    })
    .catch((err) => {
      return res.status(500).json({ msg: err.message})
    })
  }

  /**
  * Search all Users
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
*/
  static searchUsers(req, res) {
    const query = {};
    const userId = req.decoded.id;
    const roleId = req.decoded.roleId;
    const terms = req.query.text;
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];
    query.where = { $or: [
      { username: { $iLike: `%${terms}%`}}
    ]};

    db.User.findAndCountAll(query)
      .then((user) =>{
        if (!user.rows.length) {
          return res.status(404).json({ message: 'Not found '})
        }
        const offset = query.offset;
        const limit = query.limit;

        const pagination = helper.pagination(user, offset, limit);
        return res.status(200).json({ msg: user.rows, pagination });
      })
      .catch((err) => {
        return res.status(500).json({error: err.message});
      });
  }
}

export default userController;