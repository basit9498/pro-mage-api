# HHD Backend App

## Table of contents

1. [First start](#first-start)
2. [Env](#env)
3. [Database Setup](#database-setup)
4. [API](#API)

# Using npm dependencies

### Nodejs Version

18.14.2

### Npm Version

9.5.0

## Install Dependency

```bash
npm install
```

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5051](http://localhost:5051) to view it in your browser or postman.

# Env

```
PORT="5000"
DATABASE="mongodb://localhost:27017/pro-mege-db"
API_VERSION="/api/v1/"
SITE_NAME="ProMega"
```

# Database Setup

We use [`mongodb`](https://www.mongodb.com/docs/manual/tutorial/getting-started/) for data storing.

### Database Local setup.

For local setup need mongodb Compass and update .env file variable e.g [`DATABASE_URL="mongodb://0.0.0.0:27017/your-db-name"`]

### Database Cloud setup.

For Cloud setup need mongodb atlas and update .env file variable e.g [`DATABASE_URL="Your cloud database path"`]

# API For User Create

For creating the project, you must need to create some users dependent on you, because when you assign the manager to a project, it is necessary that you have some users in the database.

### API Endpoint: Create New User

#### Endpoint:

POST http://localhost:5000/api/v1/user/create

#### Request Body:

```json
{
  "name": "Abdul Basit",
  "email": "test1@test.com",
  "password": "Test@1234",
  "confirm_password": "Test@1234",
  "designation": "MANAGER" // or "DEVELOPER"
}
```

Description:
To create a new user, send a POST request to the specified endpoint with the user details in the request body. Ensure that you have appropriate permissions to access this endpoint. The designation field should be either "MANAGER" or "DEVELOPER" depending on the user's role. Upon successful creation, the user will be added to the database.
