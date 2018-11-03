import { getAllStudent } from './app';
import * as express from 'express';

const app = express();

// get
app.get('/',(req,res)=>{
    res.send('hello express');
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


export class Product{
    constructor(public id:number,public name:string,public  price: number, public rate:number,public desc:string) {}
}
 

 
    const products= new Array<Product>();
    products.push(new Product(1, "第一件商品", 10.899, 3,  "第一件商品第一件商品第一件商品第一件商品第一件商品第一件商品"));
    products.push(new Product(2, "第二件商品", 5.425, 4,  "第二件商品第二件商品第二件商品第二件商品第二件商品第二件商品"));
    products.push(new Product(3, "第三件商品", 7.66, 4.5,  "第三件商品第三件商品第三件商品第三件商品第三件商品第三件商品"));
    products.push(new Product(4, "第四件商品", 5.5, 3.5,  "第四件商品第四件商品第四件商品第四件商品第四件商品第四件商品"));
    products.push(new Product(5, "第五件商品", 8.7, 5,  "第五件商品第五件商品第五件商品第五件商品第五件商品第五件商品"));   
 
