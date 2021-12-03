
// To get/add users Experience to database/json file

var mysqlcon = require('../modules/mysql_con.js')

const getExperienceByUserId = async (uid) => {
  var edu = await mysqlcon.select_experience_uid(uid);
  // console.log("10", user);
  // console.log("9", Experience);
  return edu;
}

const getExperienceById = async (xid) => {
  return await mysqlcon.select_experience_id(xid);
}

const addExperience = async (uid, emp, role, se, ed, des, loc) => {
    await mysqlcon.insert_experience(uid, emp, role, se, ed, des, loc);
}

const updateExperience = async (xid, emp, role, se, ed, des, loc) => {
  await mysqlcon.update_experience(xid, emp, role, se, ed, des, loc);
}

const deleteExperience = async (xid) => {
  await mysqlcon.delete_experience(xid);
}

module.exports = {getExperienceByUserId, getExperienceById, addExperience, updateExperience, deleteExperience};
