// tslint:disable-next-line:no-var-requires
const session = require('express-session');
// tslint:disable-next-line:no-var-requires
const FileStore = require('session-file-store')(session);
const path = require('path');
const hbs = require('express-hbs');
const favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
      cookieParser = require('cookie-parser'),
      flash = require('connect-flash');

// tslint:disable-next-line:no-var-requires
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import {config} from './config';
import { EducationService } from './services/educationService';

export class MyExpress {
  public initExpress($sql) {
    // Initialize express app
    const app = express();

    const edu = new EducationService($sql);

    // Initialize Express middleware
    this.initMiddleware(app);

     // Initialize Express view engine
    this.initViewEngine(app);

    // Initialize Express session
    this.initSession(app);

    // User Authentication and Entitlement
    // this.userAuthentication(app);

    // Initialize modules static client routes, before session!
    this.initModulesClientRoutes(app);

    // Initialize modules server routes
    this.initModulesServerRoutes(app, edu);

    // Initialize error routes
    this.initErrorRoutes(app);

    return this.configureSSL(app);

  }

  private initMiddleware(app) {
    app.use(favicon('modules/core/client/img/brand/favicon.ico'));// address need to be changed
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(flash());
  }

  private initSession(app) {
    app.use(session({
      name: 'skey',
      secret: 'chyingp',  // 用来对session id相关的cookie进行签名
      store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
      saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
      resave: false,  // 是否每次都重新保存会话，建议false
      cookie: {
        maxAge: 30 * 60 * 1000,  // 有效期，单位是毫秒
      },
    }));
    // set flash
    app.use(function (req, res, next) {
      res.locals.errors = req.flash('error');
      res.locals.infos = req.flash('info');
      next();
    });
  }
/**
 * Configure view engine
 */
private initViewEngine = (app) => {
  app.engine('html', hbs.express4({
    extname: '.html',
  }));
  app.set('view engine', 'html');
  app.set('views', path.resolve('./'));
}

  // private userAuthentication(app) { }

  private initModulesClientRoutes(app) {
    app.use(express.static(path.resolve('./dist')));
    // app.use('/dist', express.static(path.resolve('./dist'), { maxAge: 86400000, index: false }));
    // app.use('/node_modules', express.static(path.resolve('./node_modules'), { maxAge: 86400000, index: false }));
    // app.use('/', express.static(path.resolve('./.tmp')));
  }
  private initModulesServerRoutes(app, edu) {
    config.server.routes.forEach((routePath) => {
      require(path.resolve(routePath))(app, edu);
    });
  }
  private initErrorRoutes(app) {
    app.use( (err, _, res, next) => {
      // If the error object doesn't exists
      if (!err) {
        return next();
      }
      // Redirect to error page
      res.redirect('/server-error');
    });
  }
  private configureSSL(app) {
    const server = http.createServer(app);
    return server;
  }
}
