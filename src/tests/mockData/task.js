const task = {
  title: 'Complete test',
  description: 'Complete tests for optilyz',
  deadline: new Date('12/12/21'),
  notificationTime: new Date('12/21/21'),
};

const anotherTask = {
  title: 'Another Complete test',
  description: 'Complete tests for optilyz another',
  deadline: new Date('12/12/21'),
  notificationTime: new Date('12/21/21'),
};

const taskWithoutTitle = {
  description: 'Complete tests for optilyz',
  deadline: new Date('12/12/21'),
  notificationTime: new Date('12/21/21'),
};

const taskWithoutDescription = {
  title: 'Complete test',
  deadline: new Date('12/12/21'),
  notificationTime: new Date('12/21/21'),
};

const taskWithoutDeadline = {
  title: 'Complete test',
  description: 'Complete tests for optilyz',
  notificationTime: new Date('12/21/21'),
};

const taskWithoutNotificationTime = {
  title: 'Complete test',
  description: 'Complete tests for optilyz',
  deadline: new Date('12/12/21'),
};

export {
  task,
  taskWithoutTitle,
  taskWithoutDescription,
  taskWithoutDeadline,
  taskWithoutNotificationTime,anotherTask
};
