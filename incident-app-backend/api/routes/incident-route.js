import Express from 'express';

import * as incidentController from '../controllers/incident-controller.js';
const incidentRouter = Express.Router();

incidentRouter.route('/').post(incidentController.post);
incidentRouter.route('/').get(incidentController.getAll);
incidentRouter.route('/:id').get(incidentController.get);
incidentRouter.route('/:id').put(incidentController.put);
incidentRouter.route('/:id').delete(incidentController.remove);
export default incidentRouter;