CREATE TABLE user (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fname varchar(100) NOT NULL,
    lname varchar(100) NOT NULL,
    email varchar(320) NOT NULL,
    password varchar(70) NOT NULL
);

CREATE TABLE social (
    sid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uid int NOT NULL,
    twitter varchar(100),
    github varchar(100),
    linkedin varchar(100),
    website text,
    twitter_embedding text,
    FOREIGN KEY (uid) REFERENCES user (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE experience (
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


CREATE TABLE education (
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



