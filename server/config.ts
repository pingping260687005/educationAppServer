
export let config = {
    client: {
      views: ['src/*.html', 'example/*.html'],
      allJS: ['src/**/*.js'],
      style: ['src/**/*.scss']
    },
    server: {
      allJS: ['server.js', 'config/**/*.js', 'server/*.js'],
      models: ['server/models/users.model.js'],
      views: ['src/*.html'],
      config: [],
      routes: ['server/routes/proxy.routes.js'],
    }
  };
  
