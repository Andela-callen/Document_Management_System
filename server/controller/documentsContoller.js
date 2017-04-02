import db from '../models';
import helper from '../controller/helpers/helper';
// import Authenticate from '../Middlewares/authenticate';

class documentController{
  static createDocument(req, res){
    req.body.userId = req.decoded.userId;
   db.Document.create(req.body)
   .then((document) => {
     const doc = helper.transfromDocument(document);
     return res.status(201).json({ msg: 'Document created', doc } );
   }).catch((err) => {
     return res.status(500).json({ msg: err.message });
   });
  }

/**
  * Gets all Documents
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
*/
  static getAllDocuments(req, res){
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
     if (!document.rows.length) {
       return res.status(404).json({ message: 'Document not found '})
     }
     const offset = query.offset;
     const limit = query.limit;

     const pagination = helper.pagination(document, offset, limit);
     return res.status(200).json({ msg: document.rows, pagination });
   })
   .catch((err) => {
     return res.status(500).json({error: err.message});
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
        return res.status(200).json({ msg: doc });
      } else {
        return res.status(404).json({ error: 'Document does not exist in the database'});
      }
    }).catch((err) => {
      return res.status(500).json({ msg: err.message });
    });
  }

  /**
  * Gets all Documents for a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */

  static getDocumentForUser(req,res) {
    const queryId = Number(req.params.id);
    const userId = req.decoded.userId;
    const roleId = req.decoded.roleId;
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];

    db.Role.findById(roleId)
    .then((role) => {
      if (role.title === 'Admin' || userId === queryId){
        query.where = {userId: userId}
      } else {
        query.where = { userId: userId, $and: {access: 'public'} };
      }
    })
    db.Document.findAndCountAll(query)
   .then((document) => {
     if (!document.rows.length) {
       return res.status(404).json({ message: 'Document not found '})
     }
     const offset = query.offset;
     const limit = query.limit;

     const pagination = helper.pagination(document, offset, limit);
     return res.status(200).json({ msg: document.rows, pagination });
   })
   .catch((err) => {
     return res.status(500).json({error: err.message});
   });
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
      if (!document.rows.length) {
        return res.status(404).json({msg:'Document not found'})
      } else {
        req.body.userId = document.userId;
        document.update(req.body).then(() => {
          return res.status(200).json({ msg: 'Document updated' });
        }).catch((err) => {
          return res.status(500).json({ error: err.message });
        });
      }
    });

  }

  static deleteDocument(req, res){
    db.Document.findOne({ where: { id: req.params.id } })
      .then((document) => {
        if (!document.rows.length) {
          return res.status(404).json({ msg: `Document ${req.params.id} not found` });
        }
        db.Document.destroy({ where: { id: req.params.id } })
          .then((document) => {
            return res.status(201).json({ msg: 'Document deleted' });
          });
      });
  }

 /**
  * Search all Documents
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
*/
  static searchDocument(req, res) {
    const query = {};
    const userId = req.decoded.userId;
    const roleId = req.decoded.roleId;
    const terms = req.query.text;
    query.limit = (req.query.limit > 0) ? req.query.limit : 5;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = [['createdAt', 'DESC']];

    db.Role.findById(roleId)
    .then((role) => {
      if (role && role.title === 'Admin'){
        query.where ={ $or: [
          {title: { $iLike: `%${terms}%`}},
          {content: { $iLike: `%${terms}%`}}
        ]};
      } else {
        query.where ={ $or: [
          {title: { $iLike: `%${terms}%`}},
          {content: { $iLike: `%${terms}%`}}],
          $and: { $or: [{ access: 'public'}, { userId: userId }]
        }};
      }
      db.Document.findAndCountAll(query)
      .then((document) =>{
        if (!document.rows.length) {
          return res.status(404).json({ message: 'Not found '})
        }
        const offset = query.offset;
        const limit = query.limit;

        const pagination = helper.pagination(document, offset, limit);
        return res.status(200).json({ msg: document.rows, pagination });
      })
      .catch((err) => {
        return res.status(500).json({error: err.message});
      });
    })
    .catch((err) => {
        return res.status(500).json({error: err.message});
      });
  }x
};

export default documentController;