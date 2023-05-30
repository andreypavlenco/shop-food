-- Create the stores table

CREATE TABLE stores (
  store_id SERIAL PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  store_address VARCHAR(200) NOT NULL
);

-- Create the foods table

CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  food_name VARCHAR(100) NOT NULL,
  food_price DECIMAL(8, 2) NOT NULL
  food_img VARCHAR(100) NOT NULL,
);

-- Create the deliveries table

CREATE TABLE deliveries (
  delivery_id SERIAL PRIMARY KEY,
  store_id INT NOT NULL REFERENCES stores(store_id),
  food_id INT NOT NULL REFERENCES foods(food_id),
  delivery_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for stores

INSERT INTO stores (store_name, store_address) VALUES
  ('PizzaDay', '123 Main St', ),
  ('IQPizza', '456 Elm St'),
  ('KFC', '789 Oak St');

-- Insert sample data for foods

INSERT INTO foods (food_name, food_price, food_img) VALUES
  ('Pepperoni', 145 , 'https://pizzaday.eatery.club/storage/pizzaday/product/icon/1344/26f343c40875959617a836ebad4cf0ff.jpg'),
  ('Margarita', 64, 'https://pizzaday.eatery.club/storage/pizzaday/product/icon/8299/conversions/27b10a3aeee2e3e0c4930b22ff4c9156-optimized.jpg');
  ('Salami White', 85 , 'https://iq-pizza.eatery.club/storage/iq-pizza/product/icon/18223/conversions/text-optimized.jpg'),
  ('Francesca', 120, 'https://iq-pizza.eatery.club/storage/iq-pizza/product/icon/18835/conversions/text-optimized.jpg');
  ('Salsa Burger', 90 , 'https://www.kfc-ukraine.com/admin/files/4179.png'),
  ('Takos Sirnia', 45, 'https://www.kfc-ukraine.com/admin/files/4176.png');


-- Example delivery entries

INSERT INTO deliveries (store_id, food_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6);
  
  
  CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  address VARCHAR(100) NOT NULL
);

-- Create the orders table

  CREATE TABLE orders_food (
  order_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  food_name VARCHAR(100) NOT NULL,
  food_img VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price DECIMAL(10, 2) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);