module.exports = (app, educationService) => {
  app.route('/login').post((req, res) => {
    // const sess = req.session;
    const user: any = educationService.checkUser(req.body.name, req.body.password);
    if (user) {
      req.session.regenerate((err) => {
          if (err) {
            req.flash('error','登录失败');
            return res.redirect('/'); 
              // return res.json({ret_code: 2, ret_msg: '登录失败'});
          }
          req.session.loginUser = user.name;
          res.json({ret_code: 0, ret_msg: '登录成功'});
      });
    } else {
      if(user.name === ''){
        req.flash('error','用户不存在');
        return res.redirect('/');
      }else if(req.body.password != user.password) {
        req.flash('error','密码不对');
        return res.redirect('/');
      }
      // res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }
  });

  app.route('/logout').post((req, res) => {
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug
    req.session.destroy((err) => {
      if (err) {
        res.json({ret_code: 2, ret_msg: '退出登录失败'});
        return;
      }
      // req.session.loginUser = null;
      res.clearCookie('skey');
      res.redirect('/');
     });
   });

  app.get('/api/students', (_, res) => {
    educationService.getAllStudent().then((result) => {
      res.send(result);
    });
  });

  app.get('/api/students/:id', (req, res) => {
    educationService.getStudentById(Number(req.params.id)).then((result) => {
      res.send(result);
    });
  });
  // addStudent
  app.post('/api/students', (req, res) => {
    educationService.addStudent(req.body)
    .then((result) => {
      req.body.id = result['insertId'];
      res.send({...req.body, message: 'succeed'});
    }).catch( (error: string) => {
      // TODO
      res.send({message: 'failed', reason: error});
    });
  });

  // updateStudent
  app.put('/api/students', (req, res) => {
    educationService.updateStudent(req.body)
    .then((result) => {
      if (result) {
        res.send({...req.body, message: 'succeed'});
      }
    }).catch((error) => {
      res.send({message: 'failed', reason: error});
    });
  });

  // deleteStudent
  // app.delete();

  // deleteStudents
  app.post('/api/students/deleteStudents', (req, res) => {
    console.log(req.body);
    educationService.deleteStudents(req.body)
    .then((result) => {
      if (result) {
        res.send({message: 'succeed'});
      }
    }).catch( (error) => {
      res.send({message: 'failed', reason: error});
    });
  });

  // Return a 500
  app.route('/api/server-error').get((_, res) => {
    res.status(500).render('.tmp/serve/500.html', {
      error: 'Oops! Something went wrong...',
    });
  });

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get((req, res) => {
    res.status(404).format({
      'text/html'() {
        res.render('.tmp/serve/404.html', {
          url: req.originalUrl,
        });
      },
      'application/json'() {
        res.json({
          error: 'Path not found',
        });
      },
      'default'() {
        res.send('Path not found');
      },
    });
  });

  // Define application route
  app.route('/*').get((req, res) => {
    const sess = req.session;
    const loginUser = sess.loginUser;
    const isLogined = !!loginUser;
    app.locals.loginUser = loginUser;
    app.locals.isLogined = isLogined;
    res.render('dist/index');
  });

};
