USE meal_tracker;

CREATE TABLE clients (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    pass VARCHAR(50),
    isCoach BOOLEAN,
    coach VARCHAR(50)
);

CREATE TABLE nutrition_info (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(50)
);

INSERT INTO clients(username, pass, isCoach, coach) VALUES ('Marcus','1234', TRUE, ''), ('Anna', '5678', FALSE, 'Marcus');

SELECT * FROM clients;

DROP TABLE clients;

