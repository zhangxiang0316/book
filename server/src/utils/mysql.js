const mysql = require('mysql')
const config = require('./db.js')

// 确定连接时区
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
  multipleStatements: true,
  timezone: '08:00'
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          connection.release()
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }
    })
  })
}
exports.insertMovie = async(id, name, detail) => {
  let sql = `select * from book where id = '${id}'`
  let res = await query(sql)
  res = JSON.parse(JSON.stringify(res))
  if (res.length > 0) {
    console.log('图书已存在')
    return '图书已存在'
  }
  sql = `INSERT INTO book (id, name, detail) 
               VALUES ("${id}","${name}","${detail}")`
  await query(sql)
  return '成功'
}
