import { Router } from 'express';
import SalonController from './controllers/salon.controller';
import errorHandler from './middleware/error-handler';

const routes = new Router();

// Beauty Salon
routes.post('/api/salon/insert', SalonController.insert);
routes.post('/api/salon/update/:salonId', SalonController.update);
routes.post('/api/salon/delete', SalonController.delete);
routes.get('/api/salon', SalonController.getAll);



routes.use(errorHandler);

export default routes;
