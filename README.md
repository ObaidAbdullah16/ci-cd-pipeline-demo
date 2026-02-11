# 🚀 CI/CD Pipeline Demo

![CI/CD Pipeline](https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo/actions/workflows/ci-cd.yml/badge.svg?branch=master)
### Live Demo : http://65.0.21.77:3000

A simple web app with a fully automated CI/CD pipeline that builds, pushes, and deploys to **AWS EC2** using GitHub Actions and Docker.

## Pipeline Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 🐳 Build    │───▶│ 📦 Push     │───▶│ 🚀 Deploy   │
│ Docker Image│    │ Docker Hub  │    │ AWS EC2     │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Tech Stack

- **App**: Node.js, Express
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub
- **Hosting**: AWS EC2

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
```

## Setup

Add these **secrets** in your GitHub repo (`Settings → Secrets → Actions`):

| Secret               | Description                      |
| -------------------- | -------------------------------- |
| `DOCKERHUB_USERNAME` | Your Docker Hub username         |
| `DOCKERHUB_TOKEN`    | Your Docker Hub access token     |
| `EC2_HOST`           | Your EC2 instance public IP      |
| `EC2_SSH_KEY`        | Contents of your `.pem` key file |

Create a **`production` environment** under `Settings → Environments`.
