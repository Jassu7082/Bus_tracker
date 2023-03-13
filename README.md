# MERN_AUTH

Built with Node js, Express js, Mongoose (Object Modeling for MongoDB), React Js.

## Functionalities

- Authorization
- JWT Authentication

## Tech

- Frontend: React Js
- Backend: Express js
- Database: MongoDB Atlas
- Routing: React Router Dom V6

## Installation

### Clone

Clone this repo 

### Setup

1. Install npm dependencies using `npm install`.

` 
$ cd client && npm install
$ npm install `

2. Set up a MongoDB database either locally or provision a free database with MongoDB Atlas.

3. Set up the required environment variables:

` MONGO_URI=Your_MONGO_URL
jwtToken=YOUR_SECRET_KEY `

4. Create a `.env` file in the `config/default.json` directory.

5. Navigate to the directory and run the following command to start:
``` $ npm run dev ```

### The architecture of ************************Bus-Tracker************************ Project

**Users:**

1. Parent
2. Bus Driver
3. School Management

Architecture: Fleet Management 

### Features [ Super - Final Product ]

### Parents

- Track the bus
- Registration-with school

### Bus Driver

- Steam Bus Location to Parents and School
- Send updates
- Communicate with School and Parents
- Send data to the School

### School

- Authorize Bus drivers
- Verify Parent's details and approve accounts
- Communicate with parents and Drivers
- Get attendance of Bus Drivers

**Basic functionality**: Tracking Bus Data and sending to Parents
<img width="955" alt="image" src="https://user-images.githubusercontent.com/95038380/224652507-978f756d-78ff-42f2-a6a4-aa53cf45e4fb.png">
