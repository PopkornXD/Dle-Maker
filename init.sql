CREATE TABLE user (
    id       INT(11)      NOT NULL AUTO_INCREMENT,
    username VARCHAR(30)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    created  TIMESTAMP    DEFAULT current_timestamp(),
    PRIMARY KEY (id)
);

CREATE TABLE games (
    id         INT(11)      NOT NULL AUTO_INCREMENT,
    title      VARCHAR(255) NOT NULL,
    author     VARCHAR(255) DEFAULT NULL,
    table_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    DEFAULT current_timestamp(),
    PRIMARY KEY (id)
);