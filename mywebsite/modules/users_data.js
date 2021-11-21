
// To get/add users to database/json file

let users = require('../public/data/users.json');
const fs = require('fs');
var mysqlcon = require('../modules/mysql_con.js')

const getUserByEmail = async (email) => {
  var user = await mysqlcon.select_user_email(email);
  // console.log("10", user);
  return user;
}

const getUserById = async (id) => {
  return await mysqlcon.select_user_id(id);
}

function statExists(checkPath) {
  return new Promise((resolve) => {
    fs.stat(checkPath, (err, result) => {
      if (err) {
        return resolve(undefined);
      }

      return resolve(result);
    });
  });
}

function checkAccess(checkPath, mode) {
  return new Promise((resolve) => {
    fs.access(checkPath, mode, (err) => {
      resolve(!err);
    });
  });
}

const addUser = async (fname, lname, email, hashedPassword) => {
    await mysqlcon.insert_user(fname, lname, email, hashedPassword);
}

var helper = {
 // Remove and return the first occurrence

 remove: function(array, predicate) {
  for (var i = 0; i < array.length; i++) {
   if (predicate(array[i])) {
    return array.splice(i, 1);
   }
  }
 }
}

const updateUser = async (userid, fname, lname, email) => {
  await mysqlcon.update_user(userid, fname, lname, email);
}

const deactivateUser = async (userid) => {
  await mysqlcon.delete_user(userid);
}

module.exports = {getUserByEmail, getUserById, addUser, deactivateUser, updateUser};
