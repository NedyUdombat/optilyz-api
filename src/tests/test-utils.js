import User from '../models/user';
import Task from '../models/task';

const deleteUsers = () => User.deleteMany({});
const deleteTasks = () => Task.deleteMany({});

export { deleteUsers, deleteTasks };
