module.exports = function (app) {
  const core = require('../edu.server');
  app.route('/login').post(core.login)
  // Return a 500
  app.route('/api/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);
  
  // Define application route
  app.route('/*').get(core.renderIndex);
};
