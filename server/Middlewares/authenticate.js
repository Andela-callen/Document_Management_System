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
        messaage: 'No token provided.'
      });
    }
  }
};

export default Authenticate;