# HHD Backend App

## Table of contents

1. [First start](#first-start)
2. [Project structure](#structure)
3. [Env](#env)
4. [Database Setup](#database-setup)

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

# Structure

```
.
├── README.md
├── package.json
├── .env
├── src
│   ├── config
│   ├── controller
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── validations
│   ├── index.jsx
├── server.js
```

# Env

```
API_VERSION=""
DATABASE_URL=""
ENCRYPT_SECRET_KEY=""
APP_ID=""
APP_SECRET=""
FB_BASE_URL=""
FB_VERSION=""
```

# Database Setup

We use [`mongodb`](https://www.mongodb.com/docs/manual/tutorial/getting-started/) for data storing.

### Database Local setup.

For local setup need mongodb Compass and update .env file variable e.g [`DATABASE_URL="mongodb://0.0.0.0:27017/your-db-name"`]

### Database Cloud setup.

For Cloud setup need mongodb atlas and update .env file variable e.g [`DATABASE_URL="Your cloud database path"`]
