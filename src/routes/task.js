import { Router } from 'express';

import { task } from '../controllers';

import Validator from '../middlewares/validators';
import { checkAuthorizedUser } from '../middlewares/auth';

const { find, findOne, create, update, remove, removeOne } = task;
const { handleValidation, validateTask } = Validator;

const taskRouter = Router();

taskRouter.get('/', checkAuthorizedUser, find);
taskRouter.get('/:id', checkAuthorizedUser, findOne);
taskRouter.post(
  '/',
  checkAuthorizedUser,
  validateTask,
  handleValidation,
  create,
);
taskRouter.put('/:id', checkAuthorizedUser, update);
taskRouter.delete('/', checkAuthorizedUser, remove);
taskRouter.delete('/:id', checkAuthorizedUser, removeOne);

export default taskRouter;
