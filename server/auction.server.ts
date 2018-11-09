import { getAllStudent } from './app';
import * as express from 'express';

const app = express();

// 进入页面
app.get('/', function(req, res, next){
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;

    res.render('index', {
        isLogined: isLogined,
        name: loginUser || ''
    });
});
app.get('/api/students',(req, res)=>{
    getAllStudent().then((result)=>{
        res.send(result);
    });
});

// async function sss(){
//     let allStudents = await getAllStudent();
//     // it will be called after geting allstudent  
//     console.log("allStudents   "+ allStudents);
//     console.log(allStudents);
// }

app.get('/api/students/:id',(req,res)=>{
   let p = products.find(product=>product.id == req.params.id)
   console.log(p)
   res.send(p);
 });

const server = app.listen(8000, "localhost",()=>{
 
        console.log("服务器已经启动， 地址是localhost: 8000")
});


// var users = require('./user').items;

// var findUser = function(name, password){
//     return users.find(function(item){
//         return item.name === name && item.password === password;
//     });
// };

// // 登录接口 v
// app.post('/login', function(req, res, next){
    
//     var sess = req.session;
//     var user = findUser(req.body.name, req.body.password);

//     if(user){
//         req.session.regenerate(function(err) {
//             if(err){
//                 return res.json({ret_code: 2, ret_msg: '登录失败'});                
//             }
            
//             req.session.loginUser = user.name;
//             res.json({ret_code: 0, ret_msg: '登录成功'});                           
//         });
//     }else{
//         res.json({ret_code: 1, ret_msg: '账号或密码错误'});
//     }   
// });

// // 退出登录
// app.get('/logout', function(req, res, next){
//     // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
//     // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
//     // 然后去查找对应的 session 文件，报错
//     // session-file-store 本身的bug    

//     req.session.destroy(function(err) {
//         if(err){
//             res.json({ret_code: 2, ret_msg: '退出登录失败'});
//             return;
//         }
        
//         // req.session.loginUser = null;
//         res.clearCookie(identityKey);
//         res.redirect('/');
//     });
// });


export class Product{
    constructor(public id:number,public name:string,public  price: number, public rate:number,public desc:string) {}
}
 

 
    const products= new Array<Product>();
    products.push(new Product(1, "第一件商品", 10.899, 3,  "第一件商品第一件商品第一件商品第一件商品第一件商品第一件商品"));
    products.push(new Product(2, "第二件商品", 5.425, 4,  "第二件商品第二件商品第二件商品第二件商品第二件商品第二件商品"));
    products.push(new Product(3, "第三件商品", 7.66, 4.5,  "第三件商品第三件商品第三件商品第三件商品第三件商品第三件商品"));
    products.push(new Product(4, "第四件商品", 5.5, 3.5,  "第四件商品第四件商品第四件商品第四件商品第四件商品第四件商品"));
    products.push(new Product(5, "第五件商品", 8.7, 5,  "第五件商品第五件商品第五件商品第五件商品第五件商品第五件商品"));   
 
