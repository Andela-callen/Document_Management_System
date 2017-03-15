import documentController from '../controller/documentsContoller';
import usersController from '../controller/usersController';
import express from 'express';
const router = express.Router();

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


export default router;

// router.route('/api/users/:id')
//   .get(Authenticate.isAdmin, users.getOne)
//   .put(Authenticate.isAdmin, users.updateOne)
//   .delete(Authenticate.isAdmin, users.deleteOne)

// router.route('/api/documents/:id')
// .get(Authenticate.isAdmin, document.getOne)
// .put(Authenticate.isAdmin, document.updateOne)
// .delete(Authenticate.isAdmin, document.deleteOne)