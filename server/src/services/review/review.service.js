// Initializes the `review` service on path `/review`
const { Review } = require('./review.class');
const createModel = require('../../models/review.model');
const hooks = require('./review.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/review', new Review(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('review');

  service.hooks(hooks);
};
