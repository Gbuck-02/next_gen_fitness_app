USE meal_tracker;

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  pass VARCHAR(255) NOT NULL,
  isCoach BOOLEAN NOT NULL,
  coach VARCHAR(255)
);

CREATE TABLE meal_statistics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  meal_date DATE NOT NULL,
  meal_time TIME NOT NULL,
  food VARCHAR(255) NOT NULL,
  calories INT NOT NULL DEFAULT 0,
  fat DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  carbs DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  protein DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  comments TEXT,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

INSERT INTO clients(username, pass, isCoach, coach) VALUES ('Marcus','1234', TRUE, ''), ('Anna', '5678', FALSE, 'Marcus');

INSERT INTO meal_statistics(client_id, meal_date, meal_time, food, calories, fat, carbs, protein, comments) VALUES 
(1, CURRENT_DATE, CURRENT_TIME, 'protein shake', 25.0, 0.0, 0.0, 20.0,""),
(2, CURRENT_DATE, CURRENT_TIME, 'salad', 20, 0, 0, 0, "Not sure how many for fat.carbs etc.");

INSERT INTO meal_statistics(client_id, meal_date, meal_time, food, calories, fat, carbs, protein, comments) VALUES 
(1, CURRENT_DATE, CURRENT_TIME, 'salad', 20, 0, 0, 0, "Not sure how many for fat.carbs etc.");

/*gets all info for a specific user*/
SELECT DATE_FORMAT(meal_date, '%W, %M %d, %Y') AS formatted_date,
       DATE_FORMAT(meal_time, '%l:%i %p') AS formatted_time, 
       food, calories, fat, carbs, protein, comments
FROM meal_statistics WHERE client_id = 1;

SELECT * FROM clients;

SELECT * FROM meal_statistics;

DROP TABLE clients;

DROP TABLE meal_statistics;