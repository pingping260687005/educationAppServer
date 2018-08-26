"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
// get
app.get('/', function (req, res) {
    res.send('hello express');
});
app.get('/api/products', function (req, res) {
    // res.send('查询商品请求');
    res.send(products);
});
app.get('/api/products/:id', function (req, res) {
    var p = products.find(function (product) { return product.id == req.params.id; });
    console.log(p);
    res.send(p);
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已经启动， 地址是localhost: 8000");
});
var Product = /** @class */ (function () {
    function Product(id, name, price, rate, desc) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rate = rate;
        this.desc = desc;
    }
    return Product;
}());
exports.Product = Product;
var products = new Array();
products.push(new Product(1, "第一件商品", 10.899, 3, "第一件商品第一件商品第一件商品第一件商品第一件商品第一件商品"));
products.push(new Product(2, "第二件商品", 5.425, 4, "第二件商品第二件商品第二件商品第二件商品第二件商品第二件商品"));
products.push(new Product(3, "第三件商品", 7.66, 4.5, "第三件商品第三件商品第三件商品第三件商品第三件商品第三件商品"));
products.push(new Product(4, "第四件商品", 5.5, 3.5, "第四件商品第四件商品第四件商品第四件商品第四件商品第四件商品"));
products.push(new Product(5, "第五件商品", 8.7, 5, "第五件商品第五件商品第五件商品第五件商品第五件商品第五件商品"));
//# sourceMappingURL=auction.server.js.map