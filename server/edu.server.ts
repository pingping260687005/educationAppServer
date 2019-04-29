import * as bodyParser from 'body-parser';
import * as express from 'express';
import { EducationService } from './educationService';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const educationService = new EducationService();

const server = app.listen(8000, 'localhost', () => {
  console.log('服务器已经启动， 地址是localhost: 8000');
});

// 进入页面
app.get('/', (req, res, next) => {
  // const sess = req.session;
  // const loginUser = sess.loginUser;
  // const isLogined = !!loginUser;

  // res.render('index', {
  //     isLogined,
  //     name: loginUser || '',
  // });
});

app.post('/api/user', (req, res) => {
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
  }).catch( (reason) => {
    // TODO
    res.send({message: 'failed', reason: ''});
  });
});

// updateStudent
app.put('/api/students', (req, res) => {
  educationService.updateStudent(req.body)
  .then((result) => {
    res.send({...req.body, message: 'succeed'});
  }).catch( (reason) => {
    res.send({message: 'failed', reason: ''});
  });
});

// deleteStudent
// app.delete();

// deleteStudents
app.post('/api/students/deleteStudents', (req, res) => {
  console.log(req.body);
  educationService.deleteStudents(req.body)
  .then((result) => {
    res.send({message: 'succeed'});
  }).catch( (reason) => {
    res.send({message: 'failed'});
  });
});
// json 和 class 之间的转换

/*var users = require('./user').items;

var findUser = function(name, password){
    return users.find(function(item){
        return item.name === name && item.password === password;
    });
};

// 登录接口 v
app.post('/login', function(req, res, next){

    var sess = req.session;
    var user = findUser(req.body.name, req.body.password);

    if(user){
        req.session.regenerate(function(err) {
            if(err){
                return res.json({ret_code: 2, ret_msg: '登录失败'});
            }

            req.session.loginUser = user.name;
            res.json({ret_code: 0, ret_msg: '登录成功'});
        });
    }else{
        res.json({ret_code: 1, ret_msg: '账号或密码错误'});
    }
});

// 退出登录
app.get('/logout', function(req, res, next){
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug

    req.session.destroy(function(err) {
        if(err){
            res.json({ret_code: 2, ret_msg: '退出登录失败'});
            return;
        }

        // req.session.loginUser = null;
        res.clearCookie(identityKey);
        res.redirect('/');
    });
});*/

export class Product {
  constructor(public id: number, public name: string, public price: number, public rate: number, public desc: string) { }
}

const products = new Array<Product>();
products.push(new Product(1, '第一件商品', 10.899, 3, '第一件商品第一件商品第一件商品第一件商品第一件商品第一件商品'));
products.push(new Product(2, '第二件商品', 5.425, 4, '第二件商品第二件商品第二件商品第二件商品第二件商品第二件商品'));
products.push(new Product(3, '第三件商品', 7.66, 4.5, '第三件商品第三件商品第三件商品第三件商品第三件商品第三件商品'));
products.push(new Product(4, '第四件商品', 5.5, 3.5, '第四件商品第四件商品第四件商品第四件商品第四件商品第四件商品'));
products.push(new Product(5, '第五件商品', 8.7, 5, '第五件商品第五件商品第五件商品第五件商品第五件商品第五件商品'));




export function login(req, res, next) {
  var sess = req.session;
  var user = educationService.checkUser(req.body.name, req.body.password);
  if(user){
    req.session.regenerate(function(err) {
        if(err){
            return res.json({ret_code: 2, ret_msg: '登录失败'});                
        }
        
        req.session.loginUser = user.name;
        res.json({ret_code: 0, ret_msg: '登录成功'});                           
    });
}else{
    res.json({ret_code: 1, ret_msg: '账号或密码错误'});
}   
}

export function logout(req, res, next){
 // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug    

    req.session.destroy(function(err) {
      if(err){
          res.json({ret_code: 2, ret_msg: '退出登录失败'});
          return;
      }
      
      // req.session.loginUser = null;
      res.clearCookie('skey');
      res.redirect('/');
  });
}


export function renderIndex (req, res, next){
  var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;
  res.render('index', {
    isLogined: isLogined,
    name: loginUser || ''
});
}

/**
 * Render the server error page
 */
export function renderServerError (req, res) {
  res.status(500).render('.tmp/serve/500.html', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
export function renderNotFound (req, res) {
  res.status(404).format({
    'text/html': function () {
      res.render('.tmp/serve/404.html', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
