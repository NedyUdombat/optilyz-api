import { Router } from 'express';

import { auth } from '../controllers';
import Validator from '../middlewares/validators';

const {
  handleValidation,
  validateUser: { validateUserRegistration, validateUserAuthentication },
} = Validator;

const { create, authenticate } = auth;

const authRouter = Router();

authRouter.post(
  '/register',
  validateUserRegistration,
  handleValidation,
  create,
);

authRouter.post(
  '/authenticate',
  validateUserAuthentication,
  handleValidation,
  authenticate,
);

export default authRouter;
