educationAppServer
=======

## 配置express server

* npm 命令 npm init -y 会生成一个package.json tsconfig.json 是ts的配置
* @types/node // 配置一个express server 
* npm init -y tsconfig.json 
* npm i @types/node -S 
* npm i typescript -g
* npm i gulp -g
* npm i nodemon -g
* npm i express
* npm i // 装所有第三方包
* node build/acution_server.js // 启动express 
或者
* gulp nodemon // 使用gulp启动

## 前端打包配置
* 连接http 请求: 0. module的imports 里加 HttpModule
* 必须在component组建里定义 import {Http} from "@angular/http"; import 'rxjs/RX';
* private products: Array = []; dataSource:Observable; constructor(private http: Http) {
* this.dataSource = this.http.get('/products').map(res=> res.json());
* ngOnInit(): void { this.dataSource.subscribe(res=>this.products = res); }
* 建一个proxy.conf.json { "/api":{ "target":"http://localhost:8000" } }
* 改 package.json: "start": "ng serve --proxy-config proxy.conf.json",

## vs配置
### vsCode中按快捷键“ctrl+shift+B”顶部选择, 任务=》运行生产任务,  tsc:构建-tsconfig.json. 必须先设置好tsconfig.json， task.json，
tsc 可以编译ts文件 一旦运行之后只要改变文件都会自动编译。

#### ts: tsconfig.json
```
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "build",
    "sourceMap": true,
    "declaration": false,
    "module":"commonjs",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  },
  "exclude":[
      "node_modules"
    ]
}
```

#### tsc: task.json
```
 {
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "command": "tsc",
    "isShellCommand": true,
    "args": ["-w", "-p", "."],
    "showOutput": "silent",
    "isWatching": true,
    "problemMatcher": "$tsc-watch"
}
```

#### debug: launch.js
```
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/build/auction.server.js"
        }
    ]
}
```
USE different port:
set NODE_PORT=8080
npm start