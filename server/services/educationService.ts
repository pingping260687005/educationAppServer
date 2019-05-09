export class EducationService {
  constructor(private $sql: any) {
    // open connection
    // this.$sql = $mysql.createConnection(connction.mysql);       // 创建一个连接        mysql是我们上面文件暴露出来的模板的方法
    // this.$sql.connect();       // 运用了这句才是真正连接
  }

  checkUser(userName: string, pwd: string) {
    const select = 'select * from user_education where username=' + userName + ' and password=' + pwd;
    return new Promise((resolve, reject) => {
      this.$sql.query(select, (err, res) => {   // err提示错误信息  res是查询到的内容全在里面
        if (err) {
          reject(err); // console.log("错误", err);//我们打印出，错误信息
        } else {
          // resolve(res);
          if (res.length > 0) {
            console.log(res);
            resolve(true);
          } else {
            // no data
            resolve(false);
          }
        }
      });
    });
  }

  // 查询
  getAllStudent() {
    const select = 'select * from student';
    return new Promise((resolve, reject) => {
      this.$sql.query(select, (err, res) =>  {   // err提示错误信息  res是查询到的内容全在里面
        if (err) {
          reject(err); // console.log("错误", err);//我们打印出，错误信息
        } else {
          resolve(res);
        }
      });
    });
  }

  getStudentById(id: number) {
    const selectSql = `select * from student where id=${id}`;
    return new Promise((resolve, reject) => {
      this.$sql.query(selectSql, (err, res) =>  {   // err提示错误信息  res是查询到的内容全在里面
        if (err) {
          reject(err); // console.log("错误", err);//我们打印出，错误信息
        } else {
          resolve(res);
        }
      });
    });
  }

  addStudent(student: IStudent) {
    const sql = `INSERT INTO student (studentNum, name, sex, age, phone, parentPhone, address) VALUES ('${student.studentNum}', '${student.name}', '${student.sex}', ${student.age}, ${student.phone}, ${student.parentPhone}, '${student.address}')`;
    return this.getPromise(sql);
  }

  updateStudent(student: IStudent) {
    const sql = `UPDATE student SET studentNum = '${student.studentNum}', name = '${student.studentNum}'
    , sex = '${student.sex}', age = ${student.age}, phone = ${student.phone}
    , parentPhone = ${student.parentPhone}, address = '${student.address}'
    WHERE id = ${student.id}`;
    return this.getPromise(sql);
  }

  deleteStudents(ids: number[]) {
    let idsql = '';
    ids.forEach((id, i) => {
      if (i === 0) {
        idsql += `id=${id}`;
      } else {
        idsql += ` and id=${id}`;
      }
    });
    const sql = `DELETE FROM student WHERE ${idsql}`;
    return this.getPromise(sql);
  }

  getPromise(sql: string) {
    return new Promise((resolve, reject) => {
      this.$sql.query(sql, (err, res) =>  {   // err提示错误信息  res是查询到的内容全在里面
        if (err) {
          reject(err); // console.log("错误", err);//我们打印出，错误信息
        } else {
          resolve(res);
        }
      });
    });
  }
}

// 增加

// var insert = "insert into mono (id,name,age) value (3,'中国',5000)";  //我们往数据表mono里面添加了一条数据；   id=3;name=中国;age=5000这是新的一条数据

// $sql.query(insert, function (err, res) {

//     if (err) {

//         console.log("错误", err);

//     } else {

//         console.log("添加成功", res);  //我们打印出添加成功的信息

//     }

// })

// //修改

// var updata = "update mono set name='中国' where name='北京' ";  //我们把mono表里面name数据等于中国，改为了北京

// $sql.query(updata, function (err, res) {

//     if (err) {

//         console.log("错误", err);

//     } else {

//         console.log("修改成功", res);

//     }

// })

// //删除

// var del = "delete from mono id=3" //我们删除mono表里面id=3的数据  delete删除

// $sql.query(del, function (err,res) {

//     if (err) {
//         console.log(err);
//     } else {
//         console.log("成功删除", res);
//     }

// })
