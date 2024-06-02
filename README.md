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

## Initialize mysql using docker container

```
docker pull mysql:8.0-debian
```

After pulling the image, run a container

```
docker run --name itsecwb -e MYSQL_ROOT_PASSWORD=12345 -p 3306:3306 -d mysql:8.0-debian
```

Copy the `dump.sql` file from the server directory and run it in mysql workbench to initialize the database
