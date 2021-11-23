//importando blibiotecas de rotas e verificações
import { Router } from "express";
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);
//rotas

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'),(req, res) => {
    return res.json(req.file) ;
});




//exporta as rotas
export default routes;