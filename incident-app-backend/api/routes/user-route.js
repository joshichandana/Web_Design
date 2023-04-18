import Express from 'express';

import * as userController from './../controllers/user-controller.js';
import * as authController from './../controllers/auth-controller.js'

const Router = Express.Router();

Router.route('/').post(userController.post);
Router.route('/').get(userController.getAll);
Router.route('/:id').get(userController.get);
Router.route('/').put(userController.put);
Router.route('/:id').delete(userController.remove);
Router.route('/auth').post(userController.auth);
//Router.route('/auth',authController.post);


export default Router;