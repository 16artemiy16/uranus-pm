export default {
  users: {
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
    },
  },
  projManagement: {
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'proj_management_queue',
    },
  },
};
