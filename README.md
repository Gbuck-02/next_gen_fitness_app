Team NextGen Nutrition App
---Overview
Team NextGen Nutrition is a meal tracking web application designed to improve client-coach communication and streamline food logging for fitness coaching. It was built as a senior capstone project to serve the needs of a real client — Kyle Kropfelder, founder of Team NextGen. This app integrates detailed food logging with coach access to client data, enabling a fully interactive experience similar to existing workout-tracking platforms, but tailored specifically to nutrition.

---Features
Secure user sign-up and login system

Log, quick-log, and edit food entries with macros (calories, fat, carbs, protein)

Coach-to-client interaction:
Clients can request coaches using unique codes
Coaches can view and comment on client food logs

Date navigation to view past food logs

Role-based navigation and permissions

Easy-to-use interface with responsive navigation

Client request inbox and approval/rejection interface for coaches

---Technologies Used
Frontend: Vue.js
Backend: Node.js, Express
Database: MySQL
IDE: Visual Studio Code
Authentication: Custom login system with password verification
Environment Management: .env file
API Architecture: RESTful endpoints (controllers, models, routes)

---Installation & Setup
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Gbuck-02/next_gen_fitness_app.git
2. Backend Setup
bash
Copy
Edit
cd api_server
npm install
Create a .env file:
ini
Copy
Edit
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=meal_tracker
3. MySQL Setup
Open MySQL Workbench
Import and run database.sql to initialize the schema
4. Start the Backend
bash
Copy
Edit
node server.js
Server will run at: http://localhost:3000
5. Frontend Setup
bash
Copy
Edit
cd nextgen-fitness
npm install
npm run serve
App will run at: http://localhost:8080

---Usage
Log In / Sign Up
Secure form to create accounts or log in with username/password

Home Page
View food logs for the day
Navigate to past/future dates
Access edit, log, or coach features
Display current coach (if assigned)

Logging a Meal
Log food with optional calorie/macronutrient data
Quick log from previous meals

Edit Entries
Update previously logged meals with corrected values

Coach Access
Coaches can:
See client requests
Approve/deny invitations
View client logs
Add comments to entries

Clients can:
Request a Coach
Clients without coaches can submit a unique coach code

---Project Structure
api_server/ – Backend files

controllers/ – API logic

models/ – SQL queries

routes/ – Route definitions

nextgen-fitness/ – Frontend Vue app

---Future Improvements
Add weekly summary functionality (auto-render on weekends)
Integrate nutrition goals (bulk, cut, maintain)
Add user profile fields (age, activity level, target macros)

---Maintenance Notes
All endpoints follow a pattern: http://localhost:3000/api/[action]
Routing relies on passing state (username, isCoach, coach) via Vue Router

---Author
Garrett Buck
Senior Capstone Project — Mount St. Mary's University
Email: garrettkbuck@gmail.com
