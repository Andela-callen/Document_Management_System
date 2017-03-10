const Document = require('../models/index.js').Document;

class documentController{
  static createDocument(req, res){
    const newDoc = {
     title: req.body.title,
     content: req.body.content,
     accessType: req.body.accessType,
     userId: req.body.userId
   };
   Document.create(newDoc)
   .then((document) => {
     res.status(201).json({ msg: 'Document created', document } );
   }).catch((err) => {
     res.status(500).json({ msg: err.message });
   });
  }

  static instanceDocuments(req, res){
    Document.findAll()
   .then((document) => {
     res.status(200).json({ msg: document });
   })
   .catch((err) => {
     res.status(500).json({error: err.message});
   });
  }

  static findDocument(req, res){
    Document.findOne({ where: { id: req.params.id } })
    .then((document) => {
      if (document) {
        res.status(200).json({ msg: document });
      } else {
        res.status(500).json({ error: "Document does not exist in the database"});
      }
    }).catch((err) => {
      res.status(500).json({ msg: err.message });
    });
  }

  static updateDocument(req, res){
    Document.findOne({ where: { id: req.params.id } })
    .then((document) => {
      document.title = req.body.title;
      document.content = req.body.content;
      document.save().then(() => {
        res.status(200).json({ msg: 'User updated' });
      }).catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });

  }

  static deleteDocument(req, res){
    Document.findOne({ where: { id: req.params.id } })
      .then((document) => {
        if (!document) {
          res.status(200).json({ msg: `User ${req.params.id} not found` });
        }
        Document.destroy({ where: { id: req.params.id } })
          .then((document) => {
            res.status(201).json({ msg: 'User deleted' });
          });
      });
  }
}

module.exports = documentController;