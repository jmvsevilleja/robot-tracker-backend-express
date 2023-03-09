# Robot Tracker API

This is a simple app to list and track your robots. Each robot has a name and a purpose. You can browse (list), read (view), edit, add, and delete a robot.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- TypeORM

## Installation

1.  Clone the repository:
2.  Install the dependencies:
    `cd robot-tracker-backend-express`
    `yarn install`

3.  Set up the environment variables:
    `cp .env.example .env`
    Update the `.env` file with your MongoDB connection string.

4.  Start the development server:
    `yarn dev`

## Project Structure

```
├── dist/                    # Compiled TypeScript code
├── node_modules/            # Node.js modules
├── src/                     # Source code
│   ├── controllers/         # Handlers for different API endpoints
│   ├── entities/            # Entity classes for different database tables.
│   ├── middlewares/         # Middleware functions that can be used in different routes.
│   ├── routes/              # Routers for different API endpoints.
│   ├── utils/               # Utility functions used across the app.
│   ├── database.ts          # Database connection
│   └── index.ts             # Index file
├── .env.example             # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json            # TypeScript configuration
└── yarn.lock`
```

## API Routes

| HTTP Method | Route       | Description              |
| ----------- | ----------- | ------------------------ |
| GET         | /robots     | Get all robots           |
| GET         | /robots/:id | Get a single robot by ID |
| POST        | /robots     | Create a new robot       |
| PUT         | /robots/:id | Update a robot by ID     |
| DELETE      | /robots/:id | Delete a robot by ID     |

## Authentication

This app uses JSON Web Token (JWT) based authentication. To access the protected routes, you need to include a valid JWT token in the `Authorization` header of your HTTP requests.

To obtain a JWT token, make a POST request to `/auth/login` with a JSON body containing your email and password:

```
POST /auth/login
Content-Type: application/json
{
  "email": "your_email",
  "password": "your_password"
}`
```

If the login is successful, the server will respond with a JSON object containing the JWT token:

```
Content-Type: application/json
{
  "token": "your_jwt_token_here"
}`
```

Include the JWT token in subsequent requests with header like this:

```
GET /robots
Authorization: Bearer your_jwt_token_here`
```
