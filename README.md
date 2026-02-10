# 🚀 CI/CD Pipeline Demo

![CI/CD Pipeline](https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo/actions/workflows/ci-cd.yml/badge.svg)

A simple web app with a fully automated CI/CD pipeline built using GitHub Actions. The focus of this project is on **DevOps practices**, not web development.

## Pipeline Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🐳 Build    │───▶│ 📦 Push     │───▶│ 🚀 Deploy   │
│ Docker Image│    │ Docker Hub  │    │ Production  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Tech Stack

- **App**: Node.js, Express
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub

## Run Locally

```bash
npm install
npm start
# Visit http://localhost:3000
```

## Run with Docker

```bash
docker build -t ci-cd-pipeline-demo .
docker run -p 3000:3000 ci-cd-pipeline-demo
# Visit http://localhost:3000
```

## Setup

To enable the full pipeline, add these **secrets** in your repo settings (`Settings → Secrets → Actions`):

| Secret               | Description                  |
| -------------------- | ---------------------------- |
| `DOCKERHUB_USERNAME` | Your Docker Hub username     |
| `DOCKERHUB_TOKEN`    | Your Docker Hub access token |

Then create a **`production` environment** under `Settings → Environments`.
