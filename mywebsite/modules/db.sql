CREATE TABLE Users (
    id int PRIMARY KEY AUTO_INCREMENT,
    fname varchar(100) NOT NULL,
    lname varchar(100) NOT NULL,
    email varchar(320) NOT NULL UNIQUE,
    password varchar(70) NOT NULL, 
    twitter text
);
