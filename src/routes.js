//importando blibiotecas de rotas e verificações
import { Router } from "express";
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from './app/controllers/FileController';
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointementController";
import authMiddleware from "./app/middlewares/auth";
import ShceduleController from "./app/controllers/shceduleController";
import NotificationController from "./app/controllers/NotificationController"

const routes = new Router();
const upload = multer(multerConfig);
//rotas

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index)
    .post('/appointments', AppointmentController.store)
    .delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ShceduleController.index);

routes.get('/notifications', NotificationController.index)
    .put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);


//exporta as rotas
export default routes;