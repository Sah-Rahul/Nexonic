import express from 'express';
import { getMe, login, logout, register } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.get('/logout',isAuthenticated, logout);
AuthRouter.get('/me', isAuthenticated, getMe);

export default AuthRouter;
