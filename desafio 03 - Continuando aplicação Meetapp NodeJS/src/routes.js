import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import MeetupController from './app/controllers/MeetupController';
import MeetupUserController from './app/controllers/MeetupUserController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* Middleware para verificação de usuário logado */
routes.use(authMiddleware);

/* Rota de Upload */
routes.post('/files', upload.single('file'), FileController.store);

/* Rota de usuários - Atualização */
routes.put('/users', UserController.update);

/* Rota de Meetups */
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/user', MeetupUserController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

/* Rota de Inscrições */
routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetups/:meetupId/subscriptions', SubscriptionController.store);

export default routes;
