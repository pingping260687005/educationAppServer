import * as mysql from 'mariadb';

const pool = mysql.createPool({
    host: 'localhost',           // 这是数据库的地址
    user: 'root',                  // 需要用户的名字
    password: '',            // 用户密码 ，如果你没有密码，直接双引号就是
    database: 'mysql',           // 数据库名字
  });

export const query = async (sql, queryList) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, queryList);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) { conn.end(); }
  }
};

export const beginTransaction = async (sql1, queryList1, sql2?, queryList2?, sql3?, queryList3?) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      // tslint:disable-next-line:no-unused-expression
      sql1 && queryList1.length > 0 && await conn.batch(sql1, queryList1);
      // tslint:disable-next-line:no-unused-expression
      sql2 && queryList2.length > 0 && await conn.batch(sql2, queryList2);
      // tslint:disable-next-line:no-unused-expression
      sql3 && queryList3.length > 0 && await conn.batch(sql3, queryList3);
      await conn.commit();
      return {success: true};
    } catch (error) {
      conn.rollback();
      throw error;
    }
  } catch (error) {
    throw error;
  } finally {
    if (conn) { conn.end(); }
  }
};
