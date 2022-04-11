CREATE DATABASE `store_database`;

USE `store_database`;

CREATE USER 'administrator'@'localhost' IDENTIFIED BY 'passw0rd';

GRANT ALL PRIVILEGES ON * . * TO 'administrator'@'localhost';

CREATE TABLE `category` (
  `category_id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(50),
  PRIMARY KEY (`category_id`)
);

CREATE TABLE `user` (
  `user_id` INT UNSIGNED AUTO_INCREMENT,
  `password` VARCHAR(30),
  `name` VARCHAR(50),
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `product` (
  `product_id` INT UNSIGNED AUTO_INCREMENT,
  `category_id` INT UNSIGNED,
  `name` VARCHAR(50),
  `brand` VARCHAR(50),
  `description` VARCHAR(250),
  `perishable` ENUM('Yes', 'No'),
  `lifespan` INT UNSIGNED,
  `organic` ENUM('Yes', 'No'),
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`)
);

CREATE TABLE `store` (
  `store_id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(50),
  `location` VARCHAR(50),
  PRIMARY KEY (`store_id`)
);

CREATE TABLE `manager` (
  `user_id` INT UNSIGNED NOT NULL,
  `store_id` INT UNSIGNED,
  PRIMARY KEY (`user_id`, `store_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
  FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`)
);

CREATE TABLE `offering` (
  `offering_id` INT UNSIGNED AUTO_INCREMENT,
  `store_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `price` DEC(6,2) UNSIGNED,
  `update_time` TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (`offering_id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`)
);

CREATE TABLE `shopping_list` (
  `list_id` INT UNSIGNED AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(30),
  PRIMARY KEY (`list_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
);

CREATE TABLE `list_content` (
  `list_id` INT UNSIGNED,
  `offering_id` INT UNSIGNED,
  `quantity` INT UNSIGNED,
  PRIMARY KEY (`list_id`, `offering_id`),
  FOREIGN KEY (`list_id`) REFERENCES `shopping_list`(`list_id`),
  FOREIGN KEY (`offering_id`) REFERENCES `offering`(`offering_id`)
);


INSERT INTO `user` (`password`, `name`) VALUES
  ('1234', 'Lauriane Howe'),
  ('abcd', 'Jared Ruecker');

INSERT INTO `shopping_list` (`user_id`, `name`) VALUES
  (1, 'Holiday Dinner List');

INSERT INTO `category` (`name`) VALUES
  ('Dairy'),
  ('Cereal'),
  ('Produce'),
  ('Spices'),
  ('Bakery'),
  ('Canned Goods');

INSERT INTO `store` (`name`, `location`) VALUES
  ('Superstore', 'New Minas, NS'),
  ('Sobeys', 'Wolfville, NS'),
  ('Independent', 'Wolfville, NS');
  
  
INSERT INTO `manager` (`user_id`, `store_id`) VALUES
  (1, 1);

INSERT INTO `product` (`category_id`, `name`, `brand`, `description`, `perishable`, `lifespan`, `organic`) VALUES
  (1, '3.25% Milk', 'Scotsburn', 'Really darn good milk for anything.', 'Yes', 30, 'No'),
  (3, 'Cabbage', 'Local', 'Fresh local cabbage, suitable for eating.', 'Yes', 60, 'Yes'),
  (2, 'Captin Crunch', 'Kellogs', 'TheyArrrrre great!', 'No', NULL, NULL),
  (6, 'Canned Milk', 'Canning Co.', 'Not really sure why its in a can.', 'No', NULL, NULL),
  (5, 'In-Store Baked Bread', 'Local', 'Very fluffy and high in sugar.', 'Yes', 5, 'No'),
  (4, 'Cumin', 'Spice Co.', 'Pronounced que-min, not cum-in.', 'No', NULL, NULL),
  (3, 'Oranges', '(tropical country name)', 'The orange variety. Peel is toxic (pesticides).', 'Yes', 20, 'No'),
  (3, 'Carrots', 'Not Local', 'Freshish no-local carrots, not suitable for eating.', 'Yes', 60, 'No');

INSERT INTO `offering` (`store_id`, `product_id`, `price`) VALUES
  (2, 2, 4.6),
  (1, 1, 6.26),
  (1, 3, 3.99),
  (1, 6, 6.9),
  (2, 4, 3.5),
  (2, 5, 3.29),
  (1, 5, 2.19),
  (1, 2, 2.4),
  (3, 7, 6.99),
  (3, 8, 2.99);

INSERT INTO `list_content` (`list_id`, `offering_id`, `quantity`) VALUES
  (1, 8, 3),
  (1, 4, 1),
  (1, 7, 2),
  (1, 5, 1);