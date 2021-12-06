
// To get/add users social to database/json file

var mysqlcon = require('../modules/sqlite_con.js')

const getSocialByUserId = async (uid) => {
  var social = await mysqlcon.select_social_uid(uid);
  // console.log("10", user);
  // console.log("9", social);
  return social;
}

const getSocialById = async (sid) => {
  return await mysqlcon.select_social_id(sid);
}

const addSocial = async (uid, t, g, l, te, ins, so) => {
    await mysqlcon.insert_social(uid, t, g, l, te, ins, so);
}

const updateSocial = async (sid, t, g, l, te, ins, so) => {
  await mysqlcon.update_social(sid, t, g, l, te, ins, so);
}

module.exports = {getSocialByUserId, getSocialById, addSocial, updateSocial};
