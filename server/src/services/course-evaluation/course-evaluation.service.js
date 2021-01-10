// Initializes the `courseEvaluation` service on path `/course-evaluation`
const { CourseEvaluation } = require('./course-evaluation.class');
const createModel = require('../../models/course-evaluation.model');
const hooks = require('./course-evaluation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/course-evaluation', new CourseEvaluation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('course-evaluation');

  service.hooks(hooks);
};
