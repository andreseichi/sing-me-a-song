<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/music-177-112617.png">
</p>
<h1 align="center">
  Sing me a song
</h1>
<div align="center">

  ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  <a href="https://github.com/andreseichi/sing-me-a-song/commits">
    <img alt="Github repo size" src="https://img.shields.io/github/repo-size/andreseichi/sing-me-a-song?style=for-the-badge">
  </a>
  <a href="https://github.com/andreseichi/sing-me-a-song/commits">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/andreseichi/sing-me-a-song?style=for-the-badge" />
  </a>
</div>

</br>

## Run the project

Clone the repo

```bash
  git clone https://github.com/andreseichi/sing-me-a-song
```

### Run the back-end

```bash
  cd sing-me-a-song/back-end
```

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

Start the server

```bash
  yarn dev
```

### Run the front-end

```bash
  cd sing-me-a-song/front-end
```

Install all dependencies

```bash
  yarn
```

Set the `.env` for the back-end url

```bash
  REACT_APP_API_BASE_URL
```

Start the server

```bash
  yarn start
```
