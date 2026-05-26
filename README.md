# 🚀 CI/CD Pipeline Demo

A comprehensive demonstration of a complete CI/CD pipeline with automated testing, building, and deployment using modern DevOps practices.

## 🌐 Live Demo

👉 **[View Live Pipeline Dashboard](https://pipeline.obaidinfo.xyz)**

---

## 📋 Features

- ✅ Automated code testing
- ✅ Continuous integration pipeline
- ✅ Automated builds
- ✅ Continuous deployment
- ✅ Docker containerization
- ✅ GitHub Actions workflow
- ✅ Automated versioning
- ✅ Deployment notifications
- ✅ Pipeline monitoring dashboard
- ✅ Build logs and analytics

## 🛠️ Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  
- **DevOps & CI/CD:**
  - GitHub Actions
  - Docker
  - Docker Compose
  - AWS EC2
  - Webhooks

- **Testing:**
  - Jest
  - Mocha
  - Chai
  - Supertest

- **Monitoring:**
  - Pipeline logs
  - Build metrics
  - Deployment history

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo.git
cd ci-cd-pipeline-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

4. Visit: `http://localhost:3000`

## 🐳 Docker Setup

### Build Docker Image

```bash
docker build -t ci-cd-pipeline-demo .
```

### Run Docker Container

```bash
docker run -p 3000:3000 ci-cd-pipeline-demo
```

### Using Docker Compose

```bash
docker-compose up
```

## 🚀 GitHub Actions Workflow

### Workflow Triggers

- ✅ On push to `main` branch
- ✅ On pull requests
- ✅ Manual trigger (workflow_dispatch)
- ✅ Scheduled runs

### Pipeline Stages

```
1. Checkout Code
   ↓
2. Setup Node.js
   ↓
3. Install Dependencies
   ↓
4. Run Linter
   ↓
5. Run Tests
   ↓
6. Build Application
   ↓
7. Build Docker Image
   ↓
8. Push to Registry
   ↓
9. Deploy to Server
   ↓
10. Run Smoke Tests
```

## 📊 Project Structure

```
ci-cd-pipeline-demo/
├── .github/
│   └── workflows/
│       ├── test.yml         # Testing workflow
│       ├── build.yml        # Build workflow
│       └── deploy.yml       # Deployment workflow
├── src/
│   ├── app.js              # Express app
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   └── middleware/         # Custom middleware
├── tests/
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/              # End-to-end tests
├── docker/
│   ├── Dockerfile        # Docker configuration
│   └── docker-compose.yml # Docker Compose config
├── config/
│   └── config.js         # Configuration file
├── .dockerignore
├── .gitignore
├── package.json
└── README.md
```

## 📋 Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Build application
npm run build

# Start production server
npm run prod

# Build Docker image
npm run docker:build

# Run Docker container
npm run docker:run
```

## 🔄 CI/CD Workflow Details

### 1. Testing Stage

```bash
# Automated tests run on every push
npm test

# Coverage report generated
npm run test:coverage
```

**Test Coverage:**
- Unit tests: 85%+
- Integration tests: 80%+
- E2E tests: 75%+

### 2. Build Stage

```bash
# Code is linted
npm run lint

# Application is built
npm run build

# Build artifacts created
```

### 3. Docker Stage

```bash
# Docker image is built
docker build -t app:latest .

# Image is tagged
docker tag app:latest app:v1.0.0

# Image is pushed to registry
docker push app:latest
```

### 4. Deploy Stage

```bash
# SSH into server
ssh user@server

# Pull latest image
docker pull app:latest

# Stop old container
docker stop app

# Run new container
docker run -d app:latest

# Run smoke tests
npm run test:smoke
```

## 📊 Pipeline Monitoring

View pipeline status and logs:

1. **GitHub Actions Dashboard:**
   - Navigate to: `https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo/actions`
   - View workflow runs
   - Check build status
   - Review logs

2. **Pipeline Dashboard:**
   - Visit: `https://pipeline.obaidinfo.xyz`
   - Real-time status
   - Build metrics
   - Deployment history

## 🔐 Environment Variables

Create `.env` file:

```env
# Server
NODE_ENV=production
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pipeline_db
DB_USER=admin
DB_PASSWORD=secure_password

# Deployment
DEPLOY_KEY=your_ssh_key
DEPLOY_HOST=your_server.com
DEPLOY_USER=deploy_user

# Docker Registry
REGISTRY_USERNAME=your_username
REGISTRY_PASSWORD=your_token
```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test Suite

```bash
npm test -- --testPathPattern=unit
npm test -- --testPathPattern=integration
npm test -- --testPathPattern=e2e
```

### Watch Mode

```bash
npm test -- --watch
```

### Coverage Report

```bash
npm run test:coverage
```

## 📈 Performance Metrics

### Build Time
- Average: 2-3 minutes
- Cache hit: 30-60 seconds

### Test Execution
- Unit tests: 30 seconds
- Integration tests: 45 seconds
- E2E tests: 1 minute

### Deployment Time
- Pull image: 30 seconds
- Deploy: 1 minute
- Health checks: 30 seconds

## 🐛 Troubleshooting

### Pipeline Fails

```bash
# Check GitHub Actions logs
# Navigate to Actions tab
# Click failed workflow
# Review step logs
```

### Docker Build Issues

```bash
# Clear Docker cache
docker system prune -a

# Rebuild image
docker build --no-cache -t app:latest .
```

### Deployment Failed

```bash
# Check server logs
ssh user@server
docker logs app

# Restart container
docker restart app
```

## 📝 Future Enhancements

- [ ] Kubernetes deployment
- [ ] Advanced monitoring with Prometheus
- [ ] Slack notifications
- [ ] Automated rollback
- [ ] Blue-green deployment
- [ ] Canary releases
- [ ] Load testing
- [ ] Security scanning
- [ ] Performance benchmarking
- [ ] Multi-environment support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Obaid Abdullah**
- GitHub: [@ObaidAbdullah16](https://github.com/ObaidAbdullah16)
- Portfolio: [obaidinfo.xyz](https://obaidinfo.xyz)
- Pipeline: [pipeline.obaidinfo.xyz](https://pipeline.obaidinfo.xyz)

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/ci-cd-best-practices)

## 📞 Support

If you encounter any issues or have questions:
- Open an [Issue](https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo/issues)
- Check [Discussions](https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo/discussions)
- Visit my [Portfolio](https://obaidinfo.xyz)

## ⭐ Show Your Support

Give a ⭐️ if you found this project helpful!

---

**Last Updated:** May 26, 2026
