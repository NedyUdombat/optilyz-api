import User from '../models/user';

const deleteUsers = () => User.deleteMany({});

export { deleteUsers };
