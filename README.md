# ITSECWB

## Tech Stack

- [React + Vite](https://vitejs.dev) – Frontend Framework
- [Express](https://expressjs.com) – Backend Framework
- [Tailwind](https://tailwindcss.com/) – CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) – UI Components
- [MySQL](https://www.mysql.com) – Database

- [Render]() - App Deployment
- [Porkbun]() - Mysql Deployment

## Tools

### Client

- axios - HTTP client
- react-query - Server Cache State
- react-router - Client Side Routing

- prettier - Formater
- prettier - Linter

- react-icons - Icons

### Server

- mysql2 - connect to mysql
- [cors]() - allows server to respond to requests from different origins
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - Password hashing
- [express-fileupload]() - package to upload files
- [helmet](https://helmetjs.github.io) - helps secure Express apps by setting HTTP response headers.

## Instructions

### Running client

```
cd client
npm run dev
```

Then open [localhost:3000](http://localhost:3000)

### Running server

```
cd server
npm run dev
```

This runs in port 8000 (if .env port exists) or port 5000

#### Add ENV File to server

Add an env file in the server directory with

```
PORT=8000
```

## Mysql

Just install mysql 8.0.37 to prevent this error:
`Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client`

Copy the `dump.sql` file from the server directory and run it in mysql workbench to initialize the database

# Accounts

## Admin

admin@gmail.com
Adminpassword123!

# MILESTONE 1 Instructions

Deployment Instructions - Milestone 1

Instructions

- Download itsecwb-mp-zip
- Extract it
- Go to a terminal and cd to that directory
- Go to client directory
  - cd client
  - npm i (to install packages)
  - npm run dev
- Go to Server directory
  - cd server
  - npm i (to install packages)
  - npm run dev
- Create a mysql server using version 8.0.36 / 37 (from https://dev.mysql.com/downloads/mysql/)
  - Install that mysql server and run it
  - Use the ff values for that server:
  - host: "localhost",
  - port: 3306,
  - user: "root",
  - password: "12345",
- Make sure that you run both client and server and open an instance of that mysql server
- To check the client go to http://localhost:3000
- To test the backend api use http://localhost:8000/api
- Add the .env.example to a newly created .env files for both client and server
- Run the dump.sql from the server directory to your mysql server
