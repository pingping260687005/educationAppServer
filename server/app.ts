// import * as $mysql from 'mysql';
import { MyExpress } from './express';
// import { connction } from './sql'; //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js

export function start() {
  // open connection
  // this.$sql = $mysql.createConnection(connction.mysql);       // 创建一个连接        mysql是我们上面文件暴露出来的模板的方法
  // this.$sql.connect();       // 运用了这句才是真正连接

  const app = new MyExpress();
  const sev = app.initExpress();
  // Start the app by listening on <port> at <host>
  console.log('-------------port: ', process.env.NODE_PORT);
  let port;
  if (process.env.NODE_PORT) {
    port = process.env.NODE_PORT;
  } else {
    port = 8080;
  }
  sev.listen(port, '127.0.0.1', () => {
    // Create server URL
    console.log('--');
    console.log('Server:          127.0.0.1:' + port);
    console.log('--');
  });
}
