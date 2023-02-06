(*MERN_AUTH*)
A full-stack application built with Node.js, Express.js, Mongoose, and React.js.

Functionalities
Authentication
JWT Authentication
Tech Stack
Frontend: React.js
Backend: Express.js
Database: MongoDB Atlas
Routing: React Router Dom v6
Installation
Clone this repository:
javascript
Clone this repo
Install npm dependencies in the root directory and in the client directory:
shell
Copy code
$ cd client && npm install
$ npm install
Set up a MongoDB database either locally or provision a free database with MongoDB Atlas.
Set up the required environment variables:
makefile
Copy code
MONGO_URI=Your_MONGO_URL
JWT_SECRET=YOUR_SECRET_KEY
JWT_LIFETIME=TIME
Create a .env file in the config/default.json directory.
Navigate to the root directory and run the following command to start the application:
Copy code
npm run dev
