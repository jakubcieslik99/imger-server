# <img src="https://i.ibb.co/dMSMJ3p/imger-server-1.png" width="330">

## IMGer Server 🖼️

📌 A simple REST API server used for downloading and saving images & their data using queueing mechanism. Project contains
Express.js app as a backend (server). Database used in this project is SQLite.

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/imger-server?color=orange&filename=package.json&label=server%20version)
![GitHub top language](https://img.shields.io/github/languages/top/jakubcieslik99/imger-server)
![GitHub repo size](https://img.shields.io/github/repo-size/jakubcieslik99/imger-server)

## Features

- Adding images links to download queue
- Showing data about all images in the database
- Showing data about specific image in the database
- Displaying downloaded image as a static resource

## Endpoints Documentation

📚 Documentation of all available endpoints can be found here:
[API Documentation](https://documenter.getpostman.com/view/20607862/2s93JzKLEM)

## Run Locally

- Clone repository

```bash
  git clone https://github.com/jakubcieslik99/imger-server.git
```

ℹ️ Instructions for running server app locally:

- Navigate to the server directory and install dependencies

```bash
  cd imger-server
  pnpm install
```

- Run server app in development mode

```bash
  pnpm run dev
```

## Deployment

ℹ️ Instructions for building and running server app in production

- Transpile to production build

```bash
  pnpm run build
```

- Run server app in production mode

```bash
  pnpm install --prod
  pnpm run start
```

## Environment Variables

⚙️ To run server app, you will need to add the following environment variables to your .env file

- `ENV` _(default already set for development)_

- `PORT`
- `API_URL`

- `CONCURRENT_DOWNLOADS`

## Languages

🔤 Available API messages languages: **EN**

## Feedback

If you have any feedback, please reach out to me at ✉️ contact@jakubcieslik.com

## Authors

- [@jakubcieslik99](https://www.github.com/jakubcieslik99)
