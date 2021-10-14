import Task from '../models/task';
import utils from '../utils/helpers';

const {
  jsonResponse: { sendSuccess, sendError, sendFail },
} = utils;

const find = async (req, res) => {
  const {
    user: { _id },
  } = req;

  const tasks = await Task.find({ userId: _id }).sort('-createdAt');
  if (tasks.length === 0) {
    return sendError(
      res,
      404,
      'You do not have any tasks, please add tasks to start',
    );
  }
  return sendSuccess(res, 200, 'Successfully retrieved all your tasks', {
    tasks,
  });
};

const findOne = async (req, res) => {
  const {
    user: { _id },
    params: { id },
  } = req;

  const task = await Task.findOne({
    userId: _id,
    _id: id,
  });

  if (!task) {
    return sendError(res, 404, 'This task does not exist');
  }

  return sendSuccess(res, 200, 'Successfully retrieved task', {
    task,
  });
};

const create = async (req, res) => {
  const {
    user: { _id },
    body: { title, description, deadline, notificationTime },
  } = req;

  const taskExists = await Task.findOne({
    title,
    description,
    userId: _id,
  });

  if (taskExists) {
    return sendError(res, 409, 'This tasks already exists.');
  }

  const task = await Task.create({
    title,
    description,
    deadline,
    notificationTime,
    userId: _id,
  });

  return sendSuccess(res, 201, 'Your task has been successfully created.', {
    task,
  });
};

const update = async (req, res) => {
  const {
    body,
    user: { _id },
    params: { id },
  } = req;

  const taskExists = await Task.findOne({
    userId: _id,
    _id: id,
  });

  if (!taskExists) {
    return sendError(res, 404, 'This task does not exist.');
  }

  const task = await Task.findByIdAndUpdate(
    id,
    {
      ...body,
    },
    {
      new: true,
    },
  );

  return sendSuccess(res, 201, 'Your task has been successfully updated.', {
    task,
  });
};

const remove = async (req, res) => {
  await Task.deleteMany({});
  return sendSuccess(res, 204);
};

const removeOne = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await Task.findByIdAndDelete(id);
    return sendSuccess(res, 204);
  } catch (error) {
    return sendFail(res, 500, error.message, error);
  }
};

export default {
  find,
  findOne,
  create,
  update,
  remove,
  removeOne,
};
