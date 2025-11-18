# Deployment Guide

This project uses GitHub Actions for automated deployment to the server.

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

On your server (`129.226.213.101`), you need to:

1. Install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install PM2 (process manager):
```bash
bun add -g pm2
```

3. Clone your repository:
```bash
cd /home/ubuntu
git clone git@github.com:nandazman/utils.git
cd utils
bun install
bun run build:css
```

4. Start the application:
```bash
pm2 start bun --name utils -- run start
pm2 save
pm2 startup
```

## Deployment Trigger

The deployment is automatically triggered when you push to the `main` or `master` branch.

## Manual Deployment

If you need to deploy manually:

```bash
ssh ubuntu@129.226.213.101
cd /home/ubuntu/utils
git pull origin main
bun install
bun run build:css
pm2 restart utils
```

## Port Configuration

The application runs on port 3000. Make sure your server's firewall allows incoming connections on this port.
