# ITSECWB

## Tech Stack

- [React + Vite](https://vitejs.dev) – Frontend Framework
- [Express](https://expressjs.com) – Backend Framework
- [Tailwind](https://tailwindcss.com/) – CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) – UI Components
- [MySQL](https://www.mysql.com) – Database

## Tools

### Client

- Prettier - Formater
- ESlint - Linter
- react-icons - Icons

### Server

- Colors - Colors for logging
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

## If not docker

Just install mysql 8.0.37 to prevent this error:
`Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client`

## Initialize mysql using docker container

```
docker pull mysql:8.0-debian
```

After pulling the image, run a container

```
docker run --name itsecwb -e MYSQL_ROOT_PASSWORD=12345 -p 3306:3306 -d mysql:8.0-debian
```

if on mac air m1

```
docker pull --platform linux/x86_64  mysql:8.0-debian
```

```
docker run --name itsecwb -e MYSQL_ROOT_PASSWORD=12345 -p 3306:3306 -d --platform linux/x86_64 mysql:8.0-debian
```

Copy the `dump.sql` file from the server directory and run it in mysql workbench to initialize the database
