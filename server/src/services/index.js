const users = require('./users/users.service.js');
const courseEvaluation = require('./course-evaluation/course-evaluation.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(courseEvaluation);
};
