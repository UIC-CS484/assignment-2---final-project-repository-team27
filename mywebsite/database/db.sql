
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

CREATE TABLE IF NOT EXISTS user (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fname varchar(100) NOT NULL,
    lname varchar(100) NOT NULL,
    email varchar(320) NOT NULL,
    phone varchar(15),
    location varchar(50),
    tagline varchar(200),
    password varchar(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS social (
    sid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
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
);

CREATE TABLE IF NOT EXISTS experience (
    xid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
    employer varchar(200) NOT NULL,
    role varchar(200) NOT NULL,
    start_date YEAR,
    end_date YEAR,
    description text,
    location varchar(100),
    FOREIGN KEY (uid) REFERENCES user (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS education (
    eid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
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
);

CREATE TABLE IF NOT EXISTS skill (
    sid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
    name varchar(100) NOT NULL,
    score int NOT NULL,
    FOREIGN KEY (uid) REFERENCES user (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS award (
    aid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
    name varchar(100) NOT NULL,
    year YEAR NOT NULL,
    org varchar(100),
    description varchar(250),
    FOREIGN KEY (uid) REFERENCES user (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


