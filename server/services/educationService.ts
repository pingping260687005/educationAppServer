// const dbService = require('./db.service');
import * as dbService from './db.service';

export const checkUser = async (userName: string, pwd: string) => {
  try {
    const select = 'select * from user_education where username=? and password=?';
    const conn = await dbService.query(select, [userName, pwd]);
    const res = await conn.query(select, [userName, pwd]);
    if (res.length > 0) {
      const user = {
        // tslint:disable-next-line:trailing-comma
        name: userName
      };
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// 查询
export const getAllStudent = async (_, res) => {
  try {
    const select = 'select * from student';
    const data = await dbService.query(select, []);
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error, success: false });
  }
};

export const getStudentById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const select = 'select * from student where id=?';
    const data = await dbService.query(select, [id]);
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error, success: false });
  }
};

export const addStudent = async (req, res) => {
  const student: IStudent = req.body;
  try {
    const select = 'INSERT INTO student (studentNum, name, sex, age, phone, parentPhone, address) VALUES (?,?,?,?,?,?,?)';
    const data = await dbService.beginTransaction(select, [student.studentNum, student.name, student.sex, student.age, student.phone, student.parentPhone, student.address]);
    req.body.id = data['insertId'];
    return res.json({ ...req.body, message: 'succeed' });
  } catch (error) {
    return res.json({ message: 'failed', reason: error });
  }
};

// addStudent(student: IStudent); {
//     const sql = `INSERT INTO student (studentNum, name, sex, age, phone, parentPhone, address) VALUES ('${student.studentNum}', '${student.name}', '${student.sex}', ${student.age}, ${student.phone}, ${student.parentPhone}, '${student.address}')`;
//     return this.getPromise(sql);
//   }

export const updateStudent = async (req, res) => {
  const student: IStudent = req.body;
  try {
    const select = 'UPDATE student SET studentNum = ?, name = ?, sex = ?, age =?, phone =?, parentPhone =?, address =? where id = ?;';
    await dbService.beginTransaction(select, [student.studentNum, student.name, student.sex, student.age, student.phone, student.parentPhone, student.address, student.id]);
    return res.json({ ...req.body, message: 'succeed' });
  } catch (error) {
    return res.json({ message: 'failed', reason: error });
  }
};
// updateStudent(student: IStudent); {
//     const sql = `UPDATE student SET studentNum = '${student.studentNum}', name = '${student.studentNum}'
//     , sex = '${student.sex}', age = ${student.age}, phone = ${student.phone}
//     , parentPhone = ${student.parentPhone}, address = '${student.address}'
//     WHERE id = ${student.id}`;
//     return this.getPromise(sql);
//   }

export const deleteStudents = async (req, res) => {
  const ids: number[] = req.body;
  try {
    const select = 'DELETE FROM student WHERE id=?;';
    await dbService.beginTransaction(select, ids);
    return res.json({ message: 'succeed' });
  } catch (error) {
    return res.send({ message: 'failed', reason: error });
  }
};
// deleteStudents(ids: number[]); {
//     let idsql = '';
//     ids.forEach((id, i) => {
//       if (i === 0) {
//         idsql += `id=${id}`;
//       } else {
//         idsql += ` and id=${id}`;
//       }
//     });
//     const sql = `DELETE FROM student WHERE ${idsql}`;
//     return this.getPromise(sql);
//   }

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
