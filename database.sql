CREATE DATABASE perntodo;
CREATE TABLE todo(
  todo_id serial PRIMARY KEY,
  -- serial is a number that is auto incremented
  description VARCHAR(255),
)