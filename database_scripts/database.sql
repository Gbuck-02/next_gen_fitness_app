#use the current database (will need to create it first if not already done)
USE meal_tracker;

#creating the various tables in the meal_tracker database
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
CREATE TABLE coach_invites (
	id INT AUTO_INCREMENT PRIMARY KEY,
    coach VARCHAR(255),
    username VARCHAR(255) UNIQUE NOT NULL
);

#updating the tables to add new columns
ALTER TABLE meal_statistics ADD COLUMN coach_comment VARCHAR(255);
ALTER TABLE clients ADD COLUMN coach_code VARCHAR(10) UNIQUE;

#adds dummy data into the database for testing purposes
INSERT INTO clients(username, pass, isCoach, coach) VALUES ('Marcus','$2b$10$WORoDxddKJK2NGFuPIWI0OaY794PdjCI4C3N3hqMprcDPlLF0.fmy', TRUE, ''), ('Anna', '5678', FALSE, 'Marcus');
INSERT INTO meal_statistics(client_id, meal_date, meal_time, food, calories, fat, carbs, protein, comments) VALUES 
(1, CURRENT_DATE, CURRENT_TIME, 'protein shake', 25.0, 0.0, 0.0, 20.0,""),
(2, CURRENT_DATE, CURRENT_TIME, 'salad', 20, 0, 0, 0, "Not sure how many for fat.carbs etc.");
UPDATE clients SET coach_code = 'C-36528' WHERE username = 'Marcus';

#previews what the tables and entries look like (not necessary)
SELECT * FROM clients;
SELECT * FROM meal_statistics;
SELECT * FROM coach_invites;