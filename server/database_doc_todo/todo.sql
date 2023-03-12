# users t�bla
# users t�bla l�trehoz�sa
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




DELETE FROM todos;

INSERT INTO todos
  (id, name, completed, editing)
  VALUES
  (1, 'mozi', 0,0), (2, 's�r�z�', 0,0), (3, 'boroz�', 0,0);


#lek�rdez�sek
select * from todos;

# post
INSERT INTO todos
  (name, completed)
  VALUES
  ('mozi', 0);

# delete completed
DELETE FROM todos
  WHERE completed = 1;

#put
UPDATE todos SET
  name = 'mozi', completed = 1
  WHERE id = 1;

