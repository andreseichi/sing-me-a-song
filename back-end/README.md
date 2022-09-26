<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/music-177-112617.png">
</p>
<h1 align="center">
  Sing me a song API
</h1>
<div align="center">

  ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
</div>

</br>

## Run the project

Install all dependencies

```bash
  yarn
```

Set the database in the `.env`

```bash
  DATABASE_URL=postgres://postgres:admin@localhost:5432/singmeasong
```

Run prisma migrate

```bash
  npx prisma migrate dev
```
_It's gonna seed the database automatically_

<br/>

Start the server

```bash
  yarn dev
```

## Run the tests with Jest

(_Optional_) Create a new database for tests

```bash
  DATABASE_URL=postgres://postgres:admin@localhost:5432/singmeasong__tests
```

Run prisma migrate

```bash
  npx prisma migrate dev
```
_It's gonna seed the database automatically_

<br/>

### Run the tests

```bash
  yarn test
```

### Run the tests and collect coverage

```bash
  yarn test:coverage
```