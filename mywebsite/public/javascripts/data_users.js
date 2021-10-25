
let users = require('../data/users.json');
const fs = require('fs');

const getUserByEmail = (email) => {
    // console.log(users);
    return users.find(user => user.email === email);
}
const getUserById = (id) => {
    return users.find(user => user.id === id);
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
