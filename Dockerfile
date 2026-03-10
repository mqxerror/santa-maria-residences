# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set environment variables for Vite build
# Production uses same-origin /supabase path (configured in supabase.ts)
# Localhost uses VITE_SUPABASE_URL from .env file
ENV VITE_SUPABASE_URL=http://38.97.60.181:8000
ENV VITE_SUPABASE_ANON_KEY=eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogImFub24iLCAiaXNzIjogInN1cGFiYXNlIiwgImlhdCI6IDE3MDAwMDAwMDAsICJleHAiOiAyMDAwMDAwMDAwfQ.dwquv_XjdVzN3DystbMAfy1KI3VS0zNdb-up3TUtCYA

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx config - domain redirects handled by host nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
