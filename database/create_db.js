// const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database('./portfolio.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Connected to database');
//   });

function initDB(db) {

    
      db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        fname varchar(100) NOT NULL,
        lname varchar(100) NOT NULL,
        email varchar(320) NOT NULL,
        phone varchar(15),
        location varchar(50),
        tagline varchar(200),
        password varchar(70) NOT NULL
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS social (
        sid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        uid INTEGER NOT NULL,
        twitter varchar(100),
        github varchar(100),
        linkedin varchar(100),
        website text,
        twitter_embedding text,
        insta varchar(100),
        stack_overflow varchar(100),
        FOREIGN KEY (uid) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS experience (
        xid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        uid INTEGER NOT NULL,
        employer varchar(200) NOT NULL,
        role varchar(200) NOT NULL,
        start_date YEAR,
        end_date YEAR,
        description text,
        location varchar(100),
        FOREIGN KEY (uid) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS education (
        eid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        uid INTEGER NOT NULL,
        university varchar(320) NOT NULL,
        degree varchar(100) NOT NULL,
        major varchar(150) NOT NULL,
        start_date YEAR,
        end_date YEAR,
        description text,
        location varchar(100),
        FOREIGN KEY (uid) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS skill (
        sid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        uid INTEGER NOT NULL,
        name varchar(100) NOT NULL,
        score int NOT NULL,
        FOREIGN KEY (uid) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS award (
        aid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        uid INTEGER NOT NULL,
        name varchar(100) NOT NULL,
        year YEAR NOT NULL,
        org varchar(100),
        description varchar(250),
        FOREIGN KEY (uid) REFERENCES user (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )`);

    
}

module.exports = {initDB}
