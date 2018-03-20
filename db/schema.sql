DROP DATABASE restaurants;

CREATE DATABASE restaurants;

\c restaurants;

CREATE TABLE about (
  id bigint PRIMARY KEY,
  description text NOT NULL,
  hour text NOT NULL,
  price int NOT NULL,
  style text NOT NULL,
  phone text NOT NULL
);

\copy about from 'sampleDatas/about.csv' DELIMITER ',';

CREATE TABLE banner (
  id bigint PRIMARY KEY,
  bannerImg01 text NOT NULL,
  bannerImg02 text NOT NULL,
  bannerImg03 text NOT NULL,
  bannerImg04 text NOT NULL
);

\copy banner from 'sampleDatas/banner.csv' DELIMITER ',';

CREATE TABLE photo (
  id bigint PRIMARY KEY,
  photoImg01 text NOT NULL,
  photoImg02 text NOT NULL,
  photoImg03 text NOT NULL
);

\copy photo from 'sampleDatas/photo.csv' DELIMITER ',';

CREATE TABLE restaurant (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  about_id int NOT NULL REFERENCES about (id),
  banner_id int NOT NULL REFERENCES banner (id),
  photo_id int NOT NULL REFERENCES photo (id)
);

\copy restaurant from 'sampleDatas/restaurant.csv' DELIMITER ',';

CREATE INDEX on restaurant (name);

-- psql restaurants < db/schema.sql