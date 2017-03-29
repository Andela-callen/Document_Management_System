import jwt from 'jsonwebtoken';
import db from '../models';

const secretKey = process.env.SECRET || '@loveChemIndustry';


const Authenticate = {
  checkToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    //decode token
    if (token) {

      //verifies secret and checks expiration
      jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
          return res.json ({ success: false, msg: 'Failed to authenticate token.' });
        } else {
          //if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //return error message, if there is no token
      return res.status(403).send({
        success: false,
        msg: 'No token provided.'
      });
    }
  },


  docPermission(req, res, next) {
    const docId = Number(req.params.id);
    const userId = req.decoded.userId;
    const roleId = req.decoded.roleId;
    db.Document.findById(docId).then((document) => {
      if (document && document.userId === userId) {
        next();
      } else {
        db.Role.findById(roleId).then((role) => {
          if (role && role.title === 'Admin') {
            next();
          } else {
            return res.status(403)
              .send({ msg: 'You are not allowed to access this document' });
          }
        });
      }
    });
  },

  userPermission(req, res, next) {
    const userId = Number(req.params.id);
    const ownerId = req.decoded.userId;
    const roleId = req.decoded.roleId;
    db.User.findById(ownerId).then((user) => {
      if (user && user.id === userId) {
        next();
      } else {
        db.Role.findById(roleId).then((role) => {
          if (role && role.title === 'Admin') {
            next();
          } else {
            return res.status(403).send({ msg: 'You are not authorized to update user' });
          }
        });
      }
    });
  },


  viewPermission(req, res, next) {
    const docId = req.params.id;
    const userId = req.decoded.userId;
    const roleId = req.decoded.RoleId;
    db.Role.findById(roleId).then((role) => {
      if (role && role.title === 'Admin') {
        next();
      } else if (docId) {
        db.Document.findById(docId).then((document) => {
          if (document) {
            if (document.access ==='public'|| document.UserId === userId) {
              next();
            } else {
              return res.status(403)
                .send({ msg: 'You are not allowed to view this document' });
            }
          }
        });
      } else {
        next();
      }
    });
  },
  
};

export default Authenticate;