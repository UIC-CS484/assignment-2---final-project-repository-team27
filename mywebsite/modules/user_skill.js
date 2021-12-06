
// To get/add users social to database/json file

var mysqlcon = require('../modules/sqlite_con.js')

const getSkillByUserId = async (uid) => {
  var social = await mysqlcon.select_skill_uid(uid);
  return social;
}

const getSkillById = async (sid) => {
  return await mysqlcon.select_skill_id(sid);
}

const addSkill = async (uid, name, score) => {
    await mysqlcon.insert_skill(uid, name, score);
}

const deleteSkill = async (sid) => {
  await mysqlcon.delete_skill(sid);
}

module.exports = {getSkillByUserId, getSkillById, addSkill, deleteSkill};
