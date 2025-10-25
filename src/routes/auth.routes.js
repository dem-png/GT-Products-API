import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateRegistration, validateLogin } from '../middlewares/validator.middleware.js';

const router = Router();

router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);

export default router;
