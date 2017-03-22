import db from '../models';
import helper from '../controller/helpers/helper';
// import Authenticate from '../Middlewares/authenticate';

class documentController{
  static createDocument(req, res){
    req.body.userId = req.decoded.userId;
    console.log(req)
   db.Document.create(req.body)
   .then((document) => {
     const doc = helper.transfromDocument(document);
     res.status(201).json({ msg: 'Document created', doc } );
   }).catch((err) => {
     res.status(400).json({ msg: err.message });
   });
  }

/**
  * Gets all Documents
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
*/
  static getAllDocuments(req, res){
    // http://localhost:3000/api/users?limit=10&offset=5
    const userId = req.decoded.userId;
    const roleId = req.decoded.roleId;
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];

    db.Role.findById(roleId)
    .then((role) => {
      if (role && role.title !== 'Admin'){
        query.where ={ $or: [
          {access: 'public'},
          {userId: userId}
        ]}
      }
    })
    db.Document.findAndCountAll(query)
   .then((document) => {
     if (!document) {
       return res.status(404).json({ message: 'Document not found '})
     }
     const offset = query.offset;
     const limit = query.limit;

     const pagination = helper.pagination(document, offset, limit);
     res.status(200).json({ msg: document.rows, pagination });
   })
   .catch((err) => {
     res.status(500).json({error: err.message});
   });
  }

  /**
  * Gets a Document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static getOneDocument(req, res){
    db.Document.findOne({ where: { id: req.params.id } })
    .then((document) => {
      if (document) {
        const doc = helper.transfromDocument(document);
        res.status(200).json({ msg: doc });
      } else {
        res.status(404).json({ error: 'Document does not exist in the database'});
      }
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

  /**
  * Gets all Documents for a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */

  static getDocumentForUser(req,res) {

  }

/**
  * Updates a document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
*/
  static updateDocument(req, res){
    db.Document.findOne({ where: { id: req.params.id } })
    .then((document) => {
      if (!document) {
        res.status(404).json({msg:'Document not found'})
      } else {
        req.body.userId = document.userId;
        document.update(req.body).then(() => {
          res.status(200).json({ msg: 'Document updated' });
        }).catch((err) => {
          res.status(500).json({ error: err.message });
        });
      }
      // document.title = req.body.title;
      // document.content = req.body.content;
    });

  }

  static deleteDocument(req, res){
    db.Document.findOne({ where: { id: req.params.id } })
      .then((document) => {
        if (!document) {
          res.status(404).json({ msg: `Document ${req.params.id} not found` });
        }
        db.Document.destroy({ where: { id: req.params.id } })
          .then((document) => {
            res.status(201).json({ msg: 'Document deleted' });
          });
      });
  }
}

export default documentController;