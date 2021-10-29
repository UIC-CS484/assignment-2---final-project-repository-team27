
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

module.exports = {getUserByEmail, getUserById, addUser};
