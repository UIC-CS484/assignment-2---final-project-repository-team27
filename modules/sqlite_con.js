
var conn;
const Database = require('sqlite-async')
const cdb = require('../database/create_db.js');

Database.open('./portfolio.db').then((db) => {

  conn = db;
  console.log('Connected to database');
  cdb.initDB(conn);

}).catch(err => {

  console.error(err.message);
  
})

const user_table_name = 'user';
const social_table_name = 'social';
const education_table_name = 'education';
const experience_table_name = 'experience';
const skill_table_name = 'skill';
const award_table_name = 'award';

const insert_user = async (fname, lname, email, hashedPassword) => {
  try {
    var params = [fname, lname, email, hashedPassword];
    var sql = `INSERT INTO ${user_table_name} (fname, lname, email, password) VALUES (?, ?, ?, ?)`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const select_user_email = async (email) => {
  try {
    var params = [email];
    var sql = `select * from ${user_table_name} where email=?`;
    const rows = await conn.get(sql, params);
    // console.log("82", rows);
    // if (rows) return rows[0];
    return rows;
  } finally {
  }
}

const select_user_id = async (uid) => {
  try {
    var params = [uid];
    var sql = `select * from ${user_table_name} where id=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const update_user = async (uid, fname, lname, email, phone, location, tagline) => {
  try {
    var params = [fname, lname, email, phone, location, tagline,  uid];
    var sql = `UPDATE ${user_table_name} SET fname=?, lname=?, email=?, phone=?, location=?, tagline=? where id=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const delete_user = async (uid) => {
  try {
    var params = [uid];
    var sql = `DELETE from ${user_table_name} where id=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


// Social

const select_social_uid = async (uid) => {
  try {
    var params = [uid];
    var sql = `select * from ${social_table_name} where uid=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const select_social_id = async (sid) => {
  try {
    var params = [sid];
    var sql = `select * from ${social_table_name} where sid=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


const insert_social = async (uid, t, g, l, te, ins, so) => {
  try {
    var params = [uid, t, g, l, te, ins, so];
    var sql = `INSERT INTO ${social_table_name} (uid, twitter, github, linkedin, twitter_embedding, insta, stack_overflow) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const update_social = async (sid, t, g, l, te, ins, so) => {
  try {
    var params = [t, g, l, te,ins, so, sid];
    // console.log(params);
    var sql = `UPDATE ${social_table_name} SET twitter=?, github=?, linkedin=?, twitter_embedding=?, insta=?, stack_overflow=? where sid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

// Education

const select_education_uid = async (uid) => {
  try {
    var params = [uid];
    var sql = `select * from ${education_table_name} where uid=?`;
    const rows = await conn.all(sql, params);
    // if (rows) return rows[0];
    // return rows;
    // console.log("139", rows);
    return rows;
    } finally {
  }
}

const select_education_id = async (eid) => {
  try {
    var params = [eid];
    var sql = `select * from ${education_table_name} where eid=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    // console.log("150", rows);
    return rows;
    } finally {
  }
}


const insert_education = async (uid, uni, deg, mj, sd, ed) => {
  try {
    var params = [uid, uni, deg, mj, sd, ed];
    var sql = `INSERT INTO ${education_table_name} (uid, university, degree, major, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const update_education = async (eid, uni, deg, mj, sd, ed) => {
  try {
    var params = [uni, deg, mj, sd, ed, eid];
    // console.log(params);
    var sql = `UPDATE ${education_table_name} SET university=?, degree=?, major=?, start_date=?, end_date=? where eid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const delete_education = async (eid) => {
  try {
    var params = [eid];
    var sql = `DELETE from ${education_table_name} where eid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


// Experience

const select_experience_uid = async (uid) => {
  try {
    var params = [uid];
    var sql = `select * from ${experience_table_name} where uid=?`;
    const rows = await conn.all(sql, params);
    return rows;
    } finally {
  }
}

const select_experience_id = async (xid) => {
  try {
    var params = [xid];
    var sql = `select * from ${experience_table_name} where xid=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


const insert_experience = async (uid, emp, role, se, ed, des, loc) => {
  try {
    var params = [uid, emp, role, se, ed, des, loc];
    var sql = `INSERT INTO ${experience_table_name} (uid, employer, role, start_date, end_date, description, location) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const update_experience = async (xid, emp, role, se, ed, des, loc) => {
  try {
    var params = [emp, role, se, ed, des, loc, xid];
    // console.log(params);
    var sql = `UPDATE ${experience_table_name} SET employer=?, role=?, start_date=?, end_date=?, description=?, location=? where xid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const delete_experience = async (xid) => {
  try {
    var params = [xid];
    var sql = `DELETE from ${experience_table_name} where xid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}



// Skill

const select_skill_uid = async (uid) => {
  try {
    var params = [uid];
    var sql = `select * from ${skill_table_name} where uid=?`;
    const rows = await conn.all(sql, params);
    // console.log("260 ", rows);
    return rows;
    } finally {
  }
}

const select_skill_id = async (sid) => {
  try {
    var params = [sid];
    var sql = `select * from ${skill_table_name} where sid=?`;
    const rows = await conn.get(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


const insert_skill = async (uid, name, score) => {
  try {
    var params = [uid, name, score];
    var sql = `INSERT INTO ${skill_table_name} (uid, name, score) VALUES (?, ?, ?)`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}

const delete_skill = async (sid) => {
  try {
    var params = [sid];
    // console.log(params);
    var sql = `DELETE from ${skill_table_name} where sid=?`;
    const rows = await conn.run(sql, params);
    // if (rows) return rows[0];
    return rows;
    } finally {
  }
}


module.exports = {insert_user, select_user_email, select_user_id, update_user, delete_user,
select_social_uid, select_social_id, insert_social, update_social,
select_education_uid, select_education_id, insert_education, update_education, delete_education,
select_experience_uid, select_experience_id, insert_experience, update_experience, delete_experience,
select_skill_uid, select_skill_id, insert_skill, delete_skill}
