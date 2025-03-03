DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS employee;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  employee_username TEXT UNIQUE NOT NULL,
  about TEXT,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telegram TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  zip INTEGER NOT NULL,
  commission_rate INTEGER NOT NULL,
  hour_rate INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  assigned_to TEXT,
  FOREIGN KEY (user_id) REFERENCES user (id)
);