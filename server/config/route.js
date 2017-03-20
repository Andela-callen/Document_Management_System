import documentController from '../controller/documentsContoller';
import usersController from '../controller/usersController';
import rolesController from '../controller/rolesController'

const routes = (router, authenticate) => {

  router.post('/users/login', usersController.login);
  router.post('/users/logout', usersController.logout);

  router.post('/users/', usersController.createUser);
  router.get('/users/', usersController.instanceUsers);
  router
    .route('/users/:id')
    .get(authenticate.checkToken, usersController.findUser)
    .put(authenticate.checkToken, usersController.updateUser)
    .delete(authenticate.checkToken, usersController.deleteUser);

  router.post('/documents/', documentController.createDocument);
  router.get('/documents/', documentController.instanceDocuments);
  router
    .route('/documents/:id')
    .get(authenticate.checkToken, documentController.findDocument)
    .put(authenticate.checkToken, documentController.updateDocument)
    .delete(authenticate.checkToken, documentController.deleteDocument);

  router.get('/users/:id/documents', usersController.findAllDocument);

  router.post('/roles/', rolesController.createRole);
  router.get('/roles/', rolesController.getAll);

  router
    .route('/roles/:id')
    // .get(authenticate.checkToken, usersController.findUser)
   .put(rolesController.updateRole)
    .delete(rolesController.deleteRole);
}

export default routes;