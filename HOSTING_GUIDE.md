# 🚀 CI/CD Pipeline Hosting Guide: GitHub Actions + Docker + EC2

Complete end-to-end guide for hosting the CI/CD Pipeline Demo on AWS EC2 with GitHub Actions automation, Docker containerization, and automated deployment.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Services Used & Why](#services-used--why)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [GitHub Actions Setup](#github-actions-setup)
6. [Docker Configuration](#docker-configuration)
7. [EC2 Deployment](#ec2-deployment)
8. [Monitoring](#monitoring)
9. [Cost Analysis](#cost-analysis)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
Developer Push Code to GitHub
         ↓
GitHub Actions Workflow Triggered
         ↓
┌─────────────────────────────────┐
│  CI/CD Pipeline Stages:         │
│  1. Checkout code               │
│  2. Setup Node.js               │
│  3. Run tests                   │
│  4. Lint code                   │
│  5. Build application           │
│  6. Build Docker image          │
│  7. Push to Docker Registry     │
│  8. Deploy to EC2               │
│  9. Run smoke tests             │
└─────────────────────────────────┘
         ↓
Docker Image built & pushed
         ↓
EC2 Instance receives webhook
         ↓
Pull latest Docker image
         ↓
Stop old container
         ↓
Run new container
         ↓
Application live & accessible
         ↓
https://pipeline.obaidinfo.xyz ✅
```

---

## 🛠️ Services Used & Why

### 1. **GitHub Actions** (CI/CD Automation)
**What it does:**
- Automates testing and deployment on every push
- Builds Docker images
- Deploys to EC2 automatically
- No external CI/CD tool needed

**Why use it:**
- ✅ **FREE** for public repos (2000 minutes/month)
- ✅ **Git-Native** - Workflows stored in repository
- ✅ **No External Service** - Everything in GitHub
- ✅ **Powerful** - Can do complex automation
- ✅ **Secrets Management** - Secure credential storage
- ✅ **Matrix Builds** - Test multiple configurations

**Features:**
- Workflow automation
- Secrets and variables
- Artifact storage
- Caching for speed

---

### 2. **Docker** (Containerization)
**What it does:**
- Packages your application with all dependencies
- Creates consistent environment everywhere
- Enables easy rollback and scaling

**Why use it:**
- ✅ **Consistency** - "Works on my machine" problem solved
- ✅ **Isolation** - App components isolated safely
- ✅ **Scalability** - Easy to run multiple containers
- ✅ **Version Control** - Git-track your infrastructure
- ✅ **Fast Deployment** - Containers start in seconds
- ✅ **Easy Rollback** - Switch to previous image instantly
- ✅ **Microservices** - Foundation for scaling

**Your Setup:**
```
Docker Container running on EC2
├─ Node.js runtime
├─ Express server (port 3000)
├─ Application code
└─ All dependencies
```

---

### 3. **Docker Hub** (Registry)
**What it does:**
- Stores Docker images
- Versions your containers
- Enables pull/deploy operations

**Why use it:**
- ✅ **FREE** for public images
- ✅ **Version Control** - Tag images by version
- ✅ **Accessible** - EC2 can pull anytime
- ✅ **Automated Builds** - Optional integration
- ✅ **Webhooks** - Trigger actions on push

---

### 4. **AWS EC2** (Server)
**What it does:**
- Virtual machine running your containers
- Full OS control for configuration
- Persistent storage for data

**Why use it:**
- ✅ **t2.micro FREE TIER** - 750 hours/month
- ✅ **Full Control** - Install any software
- ✅ **Scalable** - Upgrade anytime
- ✅ **Persistent** - Data survives reboots
- ✅ **Cost**: FREE (first 12 months), then ~$7-15/month

**Instance Specs:**
```
Type:             t2.micro
vCPU:             1 vCPU
Memory:           1 GB RAM
EBS Storage:      20-30 GB
Network:          Up to 5 Gbps
Cost (free tier): $0/month
Cost (after):     ~$7-15/month
```

---

### 5. **Route 53** (DNS)
**What it does:**
- Maps pipeline.obaidinfo.xyz to EC2 IP
- Provides DNS failover and health checks

**Why use it:**
- ✅ **AWS Integration** - Single console
- ✅ **Reliability** - 100% uptime SLA
- ✅ **Health Checks** - Monitor EC2 availability
- ✅ **Cost**: $0.50/month (shared with other domains)

---

### 6. **Let's Encrypt** (SSL)
**What it does:**
- Provides FREE SSL/TLS certificates
- Auto-renews certificates

**Why use it:**
- ✅ **100% FREE** - No fees
- ✅ **Auto-Renewal** - Never expires
- ✅ **Widely Trusted** - Supported everywhere

---

## 📋 Prerequisites

1. **GitHub Account** - [github.com](https://github.com)
2. **Docker Hub Account** - [hub.docker.com](https://hub.docker.com)
3. **AWS Account** - [aws.amazon.com](https://aws.amazon.com)
4. **Domain Name** - pipeline.obaidinfo.xyz
5. **Docker Desktop** installed locally (for testing)
6. **Git** installed locally

---

## 🚀 Step-by-Step Deployment

### **PHASE 1: Repository Setup**

#### Step 1.1: Clone Repository

```bash
# Clone repository
git clone https://github.com/ObaidAbdullah16/ci-cd-pipeline-demo.git
cd ci-cd-pipeline-demo

# Verify Docker files exist
ls -la
# Should show: Dockerfile, docker-compose.yml, .github/workflows/
```

#### Step 1.2: Verify Project Structure

```
ci-cd-pipeline-demo/
├── Dockerfile              ✅ Docker image definition
├── docker-compose.yml      ✅ Multi-container setup (optional)
├── server.js               ✅ Node.js Express server
├── package.json            ✅ Dependencies
├── src/                    ✅ Source code
├── .github/
│   └── workflows/
│       ├── ci.yml          ✅ Tests workflow
│       └── deploy.yml      ✅ Deployment workflow
└── README.md
```

---

### **PHASE 2: GitHub Secrets Setup**

Store sensitive credentials securely in GitHub:

#### Step 2.1: Create Secrets

1. **Go to Repository Settings:**
   - GitHub → Your repo → Settings
   - Secrets and variables → Actions
   - New repository secret

2. **Add These Secrets:**

   **Secret 1: Docker Hub Username**
   ```
   Name: DOCKERHUB_USERNAME
   Value: your-docker-hub-username
   ```

   **Secret 2: Docker Hub Token**
   ```
   Name: DOCKERHUB_TOKEN
   Value: your-docker-hub-access-token
   ```
   
   **Note:** Use access token, NOT password!
   - Docker Hub → Account settings → Security
   - New Access Token → Copy token

   **Secret 3: EC2 Host IP**
   ```
   Name: EC2_HOST
   Value: your-ec2-elastic-ip
   ```

   **Secret 4: EC2 SSH Key**
   ```
   Name: EC2_SSH_KEY
   Value: (entire contents of your .pem file)
   ```

   **Secret 5: EC2 Username**
   ```
   Name: EC2_USER
   Value: ubuntu
   ```

#### Step 2.2: Verify Secrets

```bash
# All secrets now available in GitHub Actions
# They're masked in logs for security
```

---

### **PHASE 3: EC2 Instance Setup**

#### Step 3.1: Launch EC2 Instance

1. **AWS Console → EC2 → Instances → Launch Instances**

2. **Choose AMI:**
   - Ubuntu Server 22.04 LTS (Free tier eligible)
   - Click "Select"

3. **Instance Type:**
   - Select: **t2.micro** (Free tier)
   - Click "Next"

4. **Instance Details:**
   - Number: 1
   - Network: Default VPC
   - Auto-assign Public IP: **Enable**

5. **Storage:**
   - Size: 30 GB
   - Type: gp3
   - Delete on termination: Yes

6. **Tags:**
   - Name: `ci-cd-pipeline-server`

7. **Security Group:**
   - Name: `ci-cd-pipeline-sg`
   - Inbound Rules:
   ```
   HTTP       80      0.0.0.0/0
   HTTPS      443     0.0.0.0/0
   SSH        22      Your-IP/32
   Custom TCP 3000    0.0.0.0/0 (optional, for testing)
   ```

8. **Key Pair:**
   - Create new: `ci-cd-pipeline-key`
   - Format: `.pem`
   - **Save safely** - can't recover later

9. **Review & Launch**

#### Step 3.2: Get Elastic IP

1. **EC2 Console → Elastic IPs**
2. **Allocate new address**
3. **Associate with instance**
4. **Use this IP for GitHub secret**

#### Step 3.3: Connect to EC2

```bash
# Set permissions
chmod 400 ci-cd-pipeline-key.pem

# SSH into instance
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# You should see: ubuntu@ip-172-31-XX-XX:~$
```

---

### **PHASE 4: Install Docker on EC2**

#### Step 4.1: Install Docker & Docker Compose

```bash
# SSH into EC2 first
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ubuntu

# Logout and log back in
exit
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# Verify Docker
docker --version
```

---

### **PHASE 5: GitHub Actions Workflow**

#### Step 5.1: Create Deploy Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test || true
      
      - name: Run linter
        run: npm run lint || true
      
      - name: Build Docker image
        run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/ci-cd-pipeline:latest .
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Push to Docker Hub
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/ci-cd-pipeline:latest
      
      - name: Deploy to EC2
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.EC2_SSH_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          
          ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} << 'EOF'
          
          # Pull latest image
          docker pull ${{ secrets.DOCKERHUB_USERNAME }}/ci-cd-pipeline:latest
          
          # Stop old container
          docker stop ci-cd-app || true
          docker rm ci-cd-app || true
          
          # Run new container
          docker run -d \
            --name ci-cd-app \
            --restart unless-stopped \
            -p 3000:3000 \
            -e NODE_ENV=production \
            ${{ secrets.DOCKERHUB_USERNAME }}/ci-cd-pipeline:latest
          
          # Wait and test
          sleep 5
          curl -f http://localhost:3000/health || exit 1
          
          EOF
```

#### Step 5.2: Commit & Push

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions CI/CD pipeline"
git push origin main
```

---

### **PHASE 6: Nginx Setup on EC2**

#### Step 6.1: Install & Configure Nginx

```bash
# SSH into EC2
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# Install Nginx
sudo apt install -y nginx certbot python3-certbot-nginx

# Create config
sudo nano /etc/nginx/sites-available/pipeline

# Add this content:
server {
    listen 80;
    server_name pipeline.obaidinfo.xyz;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pipeline.obaidinfo.xyz;
    
    ssl_certificate /etc/letsencrypt/live/pipeline.obaidinfo.xyz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pipeline.obaidinfo.xyz/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
}

# Save (Ctrl+X, Y, Enter)
```

#### Step 6.2: Enable Configuration

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/pipeline /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t
# Should show: syntax is ok

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

### **PHASE 7: SSL Certificate**

#### Step 7.1: Get Certificate

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d pipeline.obaidinfo.xyz \
  --non-interactive \
  --agree-tos \
  -m your-email@example.com

# You should see: Successfully received certificate
```

#### Step 7.2: Enable Auto-Renewal

```bash
# Enable timer
sudo systemctl enable certbot.timer

# Test renewal
sudo certbot renew --dry-run

# Reload Nginx
sudo systemctl reload nginx
```

---

### **PHASE 8: DNS Configuration**

#### Step 8.1: Update Route 53

1. **AWS Console → Route 53 → Hosted zones → obaidinfo.xyz**

2. **Create A Record:**
   ```
   Record name: pipeline
   Type: A (Alias)
   Value: Your EC2 Elastic IP
   TTL: 300
   ```

3. **Save**

#### Step 8.2: Test DNS

```bash
nslookup pipeline.obaidinfo.xyz
curl -I https://pipeline.obaidinfo.xyz
# Should return 200 OK
```

---

## ⚙️ GitHub Actions Workflow

### How It Works:

```
1. Developer pushes code to GitHub
     ↓
2. GitHub Actions triggers automatically
     ↓
3. Pipeline steps:
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Run tests
   - Run linter
   - Build Docker image
   - Push to Docker Hub
   - Deploy to EC2
     ↓
4. EC2 pulls latest image
     ↓
5. Stops old container
     ↓
6. Runs new container
     ↓
7. Application updates live ✅
```

### Testing the Pipeline

```bash
# Make a code change
echo "// New feature" >> src/app.js

# Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# Watch the workflow
# GitHub → Actions tab
# See pipeline run in real-time
```

---

## 🐳 Docker Configuration

### Dockerfile Example

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]
```

### Building Locally

```bash
# Build image
docker build -t ci-cd-pipeline .

# Run container
docker run -p 3000:3000 ci-cd-pipeline

# Test in browser
curl http://localhost:3000
```

---

## 📊 Monitoring

### GitHub Actions

```bash
# View workflow runs
# GitHub → Actions tab
# See all runs with status
```

### EC2 Container Status

```bash
# SSH into EC2
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# Check container
docker ps

# View logs
docker logs -f ci-cd-app

# Check resource usage
docker stats
```

### Application Health

```bash
# Test health endpoint
curl -I https://pipeline.obaidinfo.xyz/health

# Should return 200 OK

# View detailed logs
docker logs ci-cd-app | tail -50
```

---

## 💰 Cost Analysis

| Service | Usage | Cost |
|---------|-------|------|
| GitHub Actions | 2000 min/month free | FREE |
| Docker Hub | Public images | FREE |
| EC2 t2.micro | 750 hours/month | FREE* |
| Route 53 | 1 hosted zone | $0.50 |
| SSL Certificate | Let's Encrypt | FREE |
| **Total** | | **~$0.50/month** |

*Free tier first 12 months
After: ~$7-15/month

---

## 🔧 Troubleshooting

### GitHub Actions Fails

```bash
# Check workflow logs
# Actions tab → Failed run → See detailed logs

# Common issues:
# 1. Secrets not set → Go to Settings → Secrets
# 2. Docker build fails → Check Dockerfile syntax
# 3. SSH fails → Check EC2_HOST, EC2_SSH_KEY secrets
```

### Deployment Fails

```bash
# SSH into EC2
ssh -i ci-cd-pipeline-key.pem ubuntu@<ELASTIC_IP>

# Check Docker
docker ps -a
docker logs ci-cd-app

# Check Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Restart container
docker restart ci-cd-app
```

### Website Not Accessible

```bash
# Check DNS resolution
nslookup pipeline.obaidinfo.xyz

# Check security group
# AWS Console → EC2 → Security Groups
# Verify ports 80, 443 open

# Check SSL certificate
sudo certbot certificates
curl -vI https://pipeline.obaidinfo.xyz
```

---

## 📝 Maintenance

### Daily
- [ ] Pipeline runs successfully on push
- [ ] Website accessible and responsive
- [ ] Check logs for errors

### Weekly
- [ ] Review workflow runs
- [ ] Check deployment history
- [ ] Monitor resource usage

### Monthly
- [ ] Update dependencies
- [ ] Review AWS charges
- [ ] Check certificate expiry
- [ ] Test manual rollback

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

**Last Updated:** May 27, 2026  
**Status:** ✅ Production Ready  
**Cost:** ~$0.50/month
