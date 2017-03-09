// appropriate classes
// static CanvasPathMethods
// create endpoints

const User = require('../models/index.js').User;
const bcrypt = require('bcrypt');

class userController{
  static login(req, res) {
    User.findOne({ where: {username : req.body.username} })
    .then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password_digest)){
        res.status(200).json({ msg: 'Login Successful', user: user});
      } else {
        res.status(500).json({error: 'Login Failed'});
      }
    });
  }

  static logout(req, res) {

  }

  static createUser(req, res){
    let newUser = {};
    newUser.roleId = req.body.roleId;
    newUser.username = req.body.username;
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.password_confirmation = req.body.password_confirmation;

    User.create(newUser)
    .then((user) => {
       res.status(201).json({ msg: 'Created', user: user });
     })
    .catch((err) => {
       res.status(500).json({error: err.message});
     });

  }

  static instanceUsers(req, res){
    User.findAll()
    .then((user) => {
      res.status(200).json({ msg: user});
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });

  }

  static findUser(req, res){
    // User.findOne({ where: { id: req.params.id} })
  }

  static updateUser(req, res){

  }

  static deleteUser(req, res){

  }
}

module.exports = userController;