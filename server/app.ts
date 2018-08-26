var express = require("express");

var $mysql = require("mysql");

var sql = require("./sql");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js

var $sql = $mysql.createConnection(sql.mysql);       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法

$sql.connect();                          //运用了这句才是真正连接

//查询

var select = "select * from mono";   //假设我们数据表叫mono  *代表查询全部内容  select查询

$sql.query(select, function (err, res) {   //err提示错误信息  res是查询到的内容全在里面

    if (err) {

        console.log("错误", err);//我们打印出，错误信息  

    } else {

        console.log(res);      //打印出我们查询的内容

    }



})

//增加

var insert = "insert into mono (id,name,age) value (3,'中国',5000)";  //我们往数据表mono里面添加了一条数据；   id=3;name=中国;age=5000这是新的一条数据

$sql.query(insert, function (err, res) {

    if (err) {

        console.log("错误", err);

    } else {

        console.log("添加成功", res);  //我们打印出添加成功的信息

    }

})

//修改

var updata = "update mono set name='中国' where name='北京' ";  //我们把mono表里面name数据等于中国，改为了北京

$sql.query(updata, function (err, res) {

    if (err) {

        console.log("错误", err);

    } else {

        console.log("修改成功", res);

    }

})



//删除

var del = "delete from mono id=3" //我们删除mono表里面id=3的数据  delete删除

$sql.query(del, function (err,res) {



    if (err) {
        console.log(err);
    } else {
        console.log("成功删除", res);
    }

})