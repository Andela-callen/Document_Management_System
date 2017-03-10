let documentController = require ('./controller/documentsContoller');
let usersController = require('./controller/usersController');

var express = require('express');
var router = express.Router();

router.post('/users/login', usersController.login);

router.post('/users/logout', usersController.logout);

router.post('/users/', usersController.createUser);

router.get('/users/', usersController.instanceUsers);

router.get('/users/:id', usersController.findUser);

router.put('/users/:id', usersController.updateUser);

router.delete('/users/:id', usersController.deleteUser);

router.post('/documents/', documentController.createDocument);

router.get('/documents/', documentController.instanceDocuments);

router.get('/documents/:id', documentController.findDocument);

router.put('/documents/:id', documentController.updateDocument);

router.delete('/documents/:id', documentController.deleteDocument);

router.get('/users/:id/documents', usersController.findAllDocument);


module.exports = router;