# Stage 1: Build the React application
FROM node:lts-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json /app/

# Install dependencies only (to avoid copying source files)
RUN npm ci

# Copy the application source code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy static content from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 5544