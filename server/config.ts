
export let config = {
    client: {
      views: ['src/*.html', 'example/*.html'],
      allJS: ['src/**/*.js'],
      // tslint:disable-next-line:trailing-comma
      style: ['src/**/*.scss']
    },
    server: {
      allJS: ['server.js', 'config/**/*.js', 'server/*.js'],
      models: ['server/models/users.model.js'],
      views: ['src/*.html'],
      config: [],
      routes: ['server/routes/proxy.routes.js'],
    },
};
