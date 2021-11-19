
var mysql = require('mysql2');
const util = require('util');
var con = mysql.createConnection({
  host: "localhost",
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});
var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : process.env.SQL_USERNAME,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE,
    debug    : false 
 })

const user_table_name = 'Users';
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const query = util.promisify(con.query).bind(con);
function executeQuery(query, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
        return callback(err, null);
    }
    else if (connection) {
        connection.query(query, function (err, rows, fields) {
            connection.release();
            if (err) {
                return callback(err, null);
            }
            return callback(null, rows);
        })
    }
    else {
        return callback(true, "No Connection");
    }
  });
}


function getResult(query, callback) {
  executeQuery(query, function (err, rows) {
     if (!err) {
        callback(null, rows);
     }
     else {
        callback(true, err);
     }
  });
}

const insert_user = async (fname, lname, email, hashedPassword) => {
  try {
    var sql = `INSERT INTO ${user_table_name} (fname, lname, email, password) VALUES ('${fname}', '${lname}', '${email}', '${hashedPassword}')`;
    const rows = await query(sql);
    if (rows) return rows[0];
    } finally {
  }
}

const select_user_email_old = (email) => {
    var sql = `select * from ${user_table_name} where email='${email}'`;
    getResult(sql, function(err, rows){
        console.log("74", rows);    
        if(!err){
            if (rows) return rows[0];
        }else{
            console.log(err);
        }
    });   
}

const select_user_email = async (email) => {
  try {
    var sql = `select * from ${user_table_name} where email='${email}'`;
    const rows = await query(sql);
    console.log("82", rows);
    if (rows) return rows[0];
  } finally {
  }
}

const select_user_id = async (uid) => {
  try {
    var sql = `select * from ${user_table_name} where id=${uid}`;
    const rows = await query(sql);
    if (rows) return rows[0];
    } finally {
  }
}

const update_user = async (uid, fname, lname, email, twitter) => {
  try {
    var sql = `UPDATE ${user_table_name} SET fname='${fname}', lname='${lname}', email='${email}', twitter='${twitter}' where id=${uid}`;
    const rows = await query(sql);
    if (rows) return rows[0];
    } finally {
  }
}

const delete_user = async (uid) => {
  try {
    var sql = `DELETE from ${user_table_name} where id=${uid}`;
    const rows = await query(sql);
    if (rows) return rows[0];
    } finally {
  }
}

module.exports = {insert_user, select_user_email, select_user_id, update_user, delete_user}


