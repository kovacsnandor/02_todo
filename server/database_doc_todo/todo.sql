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

