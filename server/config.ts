
export let config = {
    client: {
      views: ['src/*.html', 'example/*.html'],
      allJS: ['src/**/*.js'],
      // tslint:disable-next-line:trailing-comma
      style: ['src/**/*.scss']
    },
    server: {
      allJS: ['server.js', 'config/**/*.js', 'build/**/*.js'],
      models: ['server/models/users.model.js'],
      views: ['src/*.html'],
      config: [],
      routes: ['build/server/routes/core.route.js'],
    },
};
