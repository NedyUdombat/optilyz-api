# Optilyz = A Task manager

[![Maintainability](https://api.codeclimate.com/v1/badges/29e57bda4b3442576b19/maintainability)](https://codeclimate.com/github/NedyUdombat/optilyz-api/maintainability)
[![Build Status](https://app.travis-ci.com/NedyUdombat/optilyz-api.svg?branch=dev)](https://app.travis-ci.com/NedyUdombat/optilyz-api)
[![Coverage Status](https://coveralls.io/repos/github/NedyUdombat/optilyz-api/badge.svg?branch=dev)](https://coveralls.io/github/NedyUdombat/optilyz-api?branch=dev)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

## Link to Hosted API

[API link](https://optilyz-prod.herokuapp.com/)
## Installation

1. Clone this repository into your local machine:

```bash
For HTTPS
git clone https://github.com/NedyUdombat/optilyz-api.git

For SSH
git clone git@github.com:NedyUdombat/optilyz-api.git
```

2. Install dependencies

```bash
yarn
```

3. Creat .env file

```bash
cp .env.sample .env
```

4. Start the development application by running

```bash
yarn watch
```

5. To run tests

```bash
yarn test
```

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Babel](https://babeljs.io)
- [Json Web Token](https://jwt.io/)
- [Mongoose](https://mongoosejs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint-staged](https://www.npmjs.com/package/lint-staged)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Coveralls](https://coveralls.io/)
- [Code Climate](https://codeclimate.com/)
- [Hound CI](https://houndci.com/)
- [Travis CI](https://www.travis-ci.com/)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Volleyball](https://github.com/glebec/volleyball)

## Testing tools

- [Jest](https://jestjs.io/) - A Javascript test framework.
- [Supertest](https://github.com/visionmedia/supertest) - Assertion library.

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### Users (for authentication)

```source-json
{
  "user": {
    "email": "nedy@nedy.nedy",
    "token": "jwt.token.here",
    "password": "3ed234tf23",
  }
}
```

### Task (Users tasks completed/not)

```source-json
{
  tasks: [
    {
      "title": "Have a career converBe a better leadersation with your direct reports",
      "description": "...",
      "deadline": '12/12/12',
      "notificationTime": '12/12/12 11:00',
      "isCompleted": true,
    },
    {
      "title": "Solicit feedback from your direct reports",
      "description": "...",
      "deadline": '12/12/12',
      "notificationTime": '12/12/12 11:00',
      "isCompleted": false,
    },
    {
      "title": "Write your personal brand statement",
      "description": "...",
      "deadline": '12/12/12',
      "notificationTime": '12/12/12 11:00',
      "isCompleted": false,
    }
  ]
}
```

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

```source-json
{
  "errors":{
    "body": '...'
  }
}
```

### All status codes:

- 200 for successful retrieval of resources
- 201 for successful creation and update of resources
- 204 for successful removal of resources
- 401 for Unauthorized requests, when a request requires authentication but it isn't provided
- 403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action
- 404 for Not found requests, when a resource can't be found to fulfill the request
- 405 for Method not allowed, when a method does not exist in the API
- 409 for Duplicate entry of an already existing resource
- 500 for internal server errors

## Endpoints:

API endpoint will be versioned in this format:

```$xslt
version 1 =  *{HOST}/api/v1/*
version 2 =  *{HOST}/api/v2/*
```

### Registration:

`POST /api/v1/accounts/register`

Example request body:

```source-json
{
  "user":{
    "name": "John Doe"
    "email": "john@doe.john",
    "password": "johndoe1234"
  }
}
```

No authentication required, returns a User
Required fields: `email`, `name`, `password`

### Authentication:

`POST /api/v1/accounts/login`

Example request body:

```source-json
{
  "user":{
     "email": "john@doe.john",
     "password": "johndoe1234"
  }
}
```

No authentication required, returns a User
Required fields: `email`, `password`

### GET ALL TASKS:

`GET /api/v1/tasks`

Example request body: none

Authentication required, returns a list of all tasks by a user
Required fields: none

### GET SINGLE TASK:

`GET /api/v1/tasks/{taskId}`

Example request body: none

Authentication required, returns a particular task
Required fields: none

### CREATE TASK:

`POST /api/v1/tasks`

Example request body:

```source-json
{
  "title": "Write your personal brand statement",
  "description": "...",
  "deadline": '12/12/12',
  "notificationTime": '12/12/12 11:00',
  "isCompleted": false,
}
```

Authentication required, returns an object of a new task
Required fields: `title, description, deadline, notificationTime`

### UPDATE SINGLE TASK:

`PUT /api/v1/tasks/{taskId}`

Example request body:

```source-json
{
  "title": "Write your personal brand statement",
  "description": "...",
  "deadline": '12/12/12',
  "notificationTime": '12/12/12 11:00',
  "isCompleted": false,
}
```

Authentication required, returns an updated task
Required fields: none

### DELETE SINGLE TASK:

`DELETE /api/v1/tasks/{taskId}`

Example request body:none

Authentication required, returns an empty response with status code 204
Required fields: none


### DELETE ALL TASKs:

`DELETE /api/v1/tasks`

Example request body:none

Authentication required, returns an empty response with status code 204
Required fields: none


