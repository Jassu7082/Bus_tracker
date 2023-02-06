#MERN_AUTH
A full-stack application built with Node.js, Express.js, Mongoose, and React.js.

>**Functionalities**
- Authentication
- JWT Authentication
>**Tech Stack**
- Frontend: React.js
- Backend: Express.js
- Database: MongoDB Atlas
>**Installation**
1. Clone this repository
2.Install npm dependencies in the root directory and in the client directory:
   `$ cd client && npm install
   $ npm install`
3.Set up a MongoDB database either locally or provision a free database with MongoDB Atlas.
4.Set up the required environment variables:
`MONGO_URI=Your_MONGO_URL
JWT_SECRET=YOUR_SECRET_KEY
JWT_LIFETIME=TIME`
5.Create a .env file in the config/default.json directory.
6.Navigate to the root directory and run the following command to start the application:
`npm run dev`
