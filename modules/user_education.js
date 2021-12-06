
// To get/add users Education to database/json file

var mysqlcon = require('../modules/sqlite_con.js')

const getEducationByUserId = async (uid) => {
  var edu = await mysqlcon.select_education_uid(uid);
  // console.log("10", user);
  // console.log("9", Education);
  return edu;
}

const getEducationById = async (eid) => {
  return await mysqlcon.select_education_id(eid);
}

const addEducation = async (uid, uni, deg, mj, sd, ed, des) => {
    await mysqlcon.insert_education(uid, uni, deg, mj, sd, ed, des);
}

const updateEducation = async (eid, uni, deg, mj, sd, ed, des) => {
  await mysqlcon.update_education(eid, uni, deg, mj, sd, ed, des);
}

const deleteEducation = async (eid) => {
  await mysqlcon.delete_education(eid);
}

module.exports = {getEducationByUserId, getEducationById, addEducation, updateEducation, deleteEducation};
