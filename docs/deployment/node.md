# Node.js Deployment Guide

## Prerequisites

- Node.js >= 22.13.0
- pnpm >= 11.0.8

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Production Build

### Build Static Site

```bash
# Type check and build
pnpm build

# Output directory: dist/
```

The build generates static HTML/CSS/JS files in the `dist/` directory.

## Docker Deployment

### Multi-Stage Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:22.13-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.0.8 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run Container

```bash
# Build image
docker build -t saas-landing-kit:latest .

# Run container
docker run -d -p 8080:80 --name saas-landing saas-landing-kit:latest

# View logs
docker logs saas-landing

# Stop container
docker stop saas-landing

# Remove container
docker rm saas-landing
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Run with Docker Compose:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Node.js Server Deployment

For serving with Node.js instead of nginx:

### Using serve

```bash
# Install serve globally
npm install -g serve

# Serve dist directory
serve -s dist -l 3000
```

### Using http-server

```bash
# Install http-server
npm install -g http-server

# Serve dist directory
http-server dist -p 3000
```

### Custom Node Server

Create `server.js`:

```javascript
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Add to `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

Run:

```bash
pnpm install
pnpm build
pnpm start
```

## Environment Variables

Create `.env` file:

```bash
PUBLIC_API_URL=https://api.example.com
PUBLIC_AUTH_URL=https://auth.example.com
```

Access in Astro components:

```javascript
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

## Production Checklist

- [ ] Run `pnpm build` successfully
- [ ] Test with `pnpm preview`
- [ ] Configure environment variables
- [ ] Set up SSL/TLS certificates
- [ ] Configure CDN (optional)
- [ ] Enable gzip/brotli compression
- [ ] Set up monitoring and logging
- [ ] Configure caching headers

## Deployment Platforms

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### AWS S3 + CloudFront

```bash
# Build
pnpm build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .astro dist
pnpm install
pnpm build
```

### Port Already in Use

```bash
# Kill process on port 4321
npx kill-port 4321

# Or use different port
pnpm dev --port 3000
```

### Docker Build Issues

```bash
# Build without cache
docker build --no-cache -t saas-landing-kit:latest .

# Check logs
docker logs saas-landing
```
