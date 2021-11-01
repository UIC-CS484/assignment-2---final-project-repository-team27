
// To get/add users to database/json file

let users = require('../public/data/users.json');
const fs = require('fs');

const getUserByEmail = (email) => {
    // console.log(users);
    return users.find(user => user.email === email);
}

const getUserById = (id) => {
    return users.find(user => user.id === id);
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

const addUser = (fname, lname, email, hashedPassword) => {
    users.push({
      id: Date.now().toString(),
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword
    });
    fs.writeFileSync("./public/data/users.json", JSON.stringify(users, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
    });
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

const updateUser = (userid, fname, lname, email) => {
  var user = getUserById(userid);
  var new_user = {
      id: userid,
      fname: fname,
      lname: lname,
      email: email,
      password: user['hashedPassword']
    }
  var removed = helper.remove(users, user => user.id === userid );
  users.push(new_user);
  fs.writeFileSync("./public/data/users.json", JSON.stringify(users, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
  });

}

const deactivateUser = (userid) => {
  // const user = getUserById(userid);
  var removed = helper.remove(users, user => user.id === userid );
  // var removed = helper.remove(arr, row => row.id === 5 );
  fs.writeFileSync("./public/data/users.json", JSON.stringify(users, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
  });
}

module.exports = {getUserByEmail, getUserById, addUser, deactivateUser, updateUser};
