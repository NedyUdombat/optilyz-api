const user = {
  email: 'johndoe@gmail.com',
  name: 'john doe',
  password: 'password123',
};

const userWithoutName = {
  email: 'johndoe@gmail.com',
  password: 'password123',
};

const userWithoutEmail = {
  name: 'john doe',
  password: 'password123',
};

const userWithoutPassword = {
  email: 'johndoe@gmail.com',
  name: 'john doe',
};

const nonExistentUser = {
  email: 'johndoenonexistent@gmail.com',
  name: 'john doe',
  password: 'password123',
};

export {
  user,
  nonExistentUser,
  userWithoutName,
  userWithoutEmail,
  userWithoutPassword,
};
