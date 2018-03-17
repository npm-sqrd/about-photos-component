DROP DATABASE restaurants;

CREATE DATABASE restaurants;

\c restaurants;

CREATE TABLE restaurant (
  id PRIMARY KEY,
  name text NOT NULL,
  about_id int NOT NULL REFERENCES about (id),
  banner text[4] NOT NULL,
  photo text[3] NOT NULL
);

CREATE TABLE about (
  id PRIMARY KEY,
  description text NOT NULL,
  hour text NOT NULL,
  price int NOT NULL,
  style text NOT NULL,
  phone text NOT NULL
);

image
type: banner photo


-- psql postgres -U <USERNAME> < database/schema.sql