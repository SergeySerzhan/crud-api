# crud-api

## Install
Run 'npm i' to install all dependencies.

## Run dev server
Run 'npm run start:dev' to run dev server on http://localhost:3000

## Build
Run 'npm run start:prod' to build application and run server on http://localhost:3000

## Multi
Run 'npm run start:multi' to  starts multiple instances of  application using the Node.js Cluster API (equal to the number of logical processor cores on the host machine)

## Tests
Run 'npm run tests' to test application with jest

## Usage
You can use POSTMAN or another tool to send requests to server:

### GET api/users
Get all users. Array with all users in JSON format.
Example: {
            users: [{id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'Sergey', age: 25, hobbies: ['coding', 'playing computer games']}]
        }

### GET api/users/{userId}
Get user by id. Where userId is valid uuid.
Example {
            user: {id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'Sergey', age: 25, hobbies: ['coding', 'playing computer games']}
        }

### POST api/users
Create user. Request should contain body in JSON format:
'{
    "username": "Sergey",
    "age": 25,
    "hobbies": ["coding", "playing computer games"]
}
'.
Response looks like: 
'{
    user: user: {id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'Sergey', age: 25, hobbies: ['coding', 'playing computer games']}
}'

### PUT api/users/{userId}
Update exist user. Where userId is valid uuid. Should contain body in JSON format:
'{
    "username": "Sergey",
    "age": 25,
    "hobbies": ["coding", "playing computer games"]
}'
Fields 'username', 'age', 'hobbies' are REQUIRED.
Response looks like:
'{
user: user: {id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'Sergey', age: 25, hobbies: ['coding', 'playing computer games']}
}'

### DELETE api/users/{userId}
Delete exist user. Where userId is valid uuid.
Response with status 204 No-Content.
