# Pub Quiz Assignment

### Name:
Declan de Haas

## A URL to your RESTful API as a web service on Render.
Here is the URL to my RESTful API as a web service on Render:
"https://express-pub-quiz-app.onrender.com"

## How do you setup the environment, i.e., after the repository is cloned, what do you need to do before you run the RESTful API?
Once you have cloned the repo, with my code in it, you will need to run the following command into the terminal in this order `npm install` or `npm i` to install all the dependices.

## How do you run your REST API locally?
To run my REST API locally, you will need to run the command `npm run dev`. Then open Postman and input "https://localhost:3000/api/v1/{the route you want}" and chose what you would like to do.

## How do you run your API/integration tests?
To run the the API tests you will need to run the command `npm run test`. This will run all the test I have created.

## How do you create and apply a migration?
To create a migration with my code, you will need to:

You will need to run the command `npx prisma migrate` in the terminal. Then enter a name you want to use for the migration or just press <kbd>Enter</kbd> to create or apply a migration.

## How do you reset your database?
To reset my database you will need to `delete` the folder in prisma called migrations then run the command `npx prisma migrate reset --force` in the terminal, which will save it without any migration and reset the database.

## How do you seed super admin users?
Run the command `npx prisma db seed` in the terminal, this will seed the database.

## How do you open Prisma Studio?
To open Prisma Studio for my project, all you will need to run the command `npm run studio`.

## How do you lint and fix your code?
To run ESLint (lint) on my code, you will need to execute the command `npm run lint:check` in the terminal, and to fix the code, you will need to run the command `npm run lint:check --fix` in the terminal or go to the file and find the line where the error is and manually fix it.

## How do you format your code?
When formatting my code, I use Prettier. To format my code, I follow these steps:

You will need to run the following commands (in that order) in my terminal:
- `npm run prettier:check`
- `git add .`
- `npm run prettier:write`

## References
I have used ChatGPT for this assignment, and these are the commands I have used:
- "spell and grammar check this code" followed by the code/readme files.
- "explain this error" followed by the error.
