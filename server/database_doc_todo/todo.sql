# users tábla
# users tábla létrehozása
CREATE TABLE todo.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) DEFAULT NULL,
  lastName VARCHAR(50) DEFAULT NULL,
  gender VARCHAR(10) DEFAULT NULL,
  userName VARCHAR(50) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  password VARCHAR(100) DEFAULT NULL,
  number INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 23,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE todo.users 
  ADD UNIQUE INDEX UK_users_email(email);


# teszt adatok

DELETE FROM todos;

INSERT INTO todos
  (id, name, completed, editing, userId)
  VALUES
  (1, 'mozi', 0,0, 23), (2, 'sörözõ', 0,0, 23), (3, 'borozó', 0,0, 23),
  (4, 'munka', 0,0, 24), (5, 'váráslás', 0,0, 24), (6, 'fõzés', 0,0, 24);

select * from todos;

call todoGen();

#lekérdezések
select * from todos;
select * from users; # jelszó 123

SELECT * FROM todos
  WHERE userId = 23;


# post
INSERT INTO todos
  (name, completed, userId)
  VALUES
  ('mozi', 0, 23);

# delete completed
DELETE FROM todos
  WHERE completed = 1;

#put
UPDATE todos SET
  name = 'mozi', completed = 1, userId = 23
  WHERE id = 1;

select * from users;

