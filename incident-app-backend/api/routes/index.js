import Router from './user-route.js';
import incidentRouter from './incident-route.js';


export default (app) => {
  app.use('/users', Router);
  app.use('/incidents', incidentRouter);
};