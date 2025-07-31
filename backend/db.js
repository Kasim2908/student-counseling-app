// db.js
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // change if needed
  database: 'student_counseling'
});

conn.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

module.exports = conn;
