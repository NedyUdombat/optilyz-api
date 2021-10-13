import { Router } from 'express';

import { account } from '../controllers';
import Validator from '../middlewares/validators';

const {
  handleValidation,
  validateUser: { validateUserRegistration, validateUserAuthentication },
} = Validator;

const { create, authenticate } = account;

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
