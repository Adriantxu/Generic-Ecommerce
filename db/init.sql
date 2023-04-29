CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(1) NOT NULL
);

CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  owner_id INTEGER REFERENCES Users(id)
);

CREATE TABLE Categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Product_Categories (
  product_id INTEGER REFERENCES Product(id),
  category_id INTEGER REFERENCES Categories(id),
  PRIMARY KEY (product_id, category_id)
);

CREATE TABLE Shopping_Cart (
  user_id INTEGER REFERENCES User(id),
  product_id INTEGER REFERENCES Product(id),
  quantity INTEGER NOT NULL,
  PRIMARY KEY (user_id, product_id)
);
