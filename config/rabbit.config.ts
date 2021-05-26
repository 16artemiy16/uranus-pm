export default {
  users: {
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'uranus_users_queue',
    },
  },
  pm: {
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'uranus_pm_queue',
    },
  },
};
