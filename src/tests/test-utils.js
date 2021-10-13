import User from '../models/user';

const deleteUsers = async () => await User.deleteMany({});

export { deleteUsers };
