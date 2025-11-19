# Deployment Guide

This project uses GitHub Actions for automated binary deployment to the server.

## Deployment Process

The deployment builds a compiled binary and deploys only the necessary files:
- **Compiled binary** (`server`) - standalone executable with Bun runtime included
- **Public directory** - static assets (HTML, CSS, JS, etc.)

No source code, dependencies, or Bun installation needed on the server!

## GitHub Secrets Setup

You need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:

### Required Secrets

- **SERVER_HOST**: `129.226.213.101`
- **SERVER_USER**: `ubuntu`
- **SSH_PRIVATE_KEY**: Your SSH private key for accessing the server

## How to Get SSH Private Key

```bash
# On your local machine, copy your SSH private key
cat ~/.ssh/id_rsa
# or
cat ~/.ssh/id_ed25519
```

Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) and paste it as the `SSH_PRIVATE_KEY` secret.

## Server Setup

On your server (`129.226.213.101`), you only need PM2 for process management:

1. Install Node.js (for PM2):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install PM2:
```bash
sudo npm install -g pm2
```

3. Create application directory:
```bash
mkdir -p /home/ubuntu/utils
```

4. Setup PM2 to start on boot:
```bash
pm2 startup
# Follow the command that PM2 outputs
pm2 save
```

## Deployment Trigger

The deployment is automatically triggered when you push to the `main` or `master` branch.

The workflow will:
1. Build the compiled binary in GitHub Actions
2. Transfer the binary and public files via SCP
3. Restart the application using PM2

## Manual Deployment

If you need to deploy manually:

1. Build locally:
```bash
bun run build
```

2. Deploy to server:
```bash
scp server ubuntu@129.226.213.101:/home/ubuntu/utils/
scp -r public ubuntu@129.226.213.101:/home/ubuntu/utils/
ssh ubuntu@129.226.213.101 "cd /home/ubuntu/utils && chmod +x server && pm2 restart utils"
```

## Port Configuration

The application runs on port 3333. Make sure your server's firewall allows incoming connections on this port.
