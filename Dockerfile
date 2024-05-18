# Use the official Node.js 14 image as a base for building the app
FROM node:14-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . /app

# Build the app for production
RUN npm run build

# Use the official NGINX image as base for serving the app
FROM nginx:stable-alpine

# Copy the built app files from the builder stage to the NGINX document root
COPY --from=builder /app/build /usr/share/nginx/html

# Remove default nginx config and insert your own
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

# Expose port 3000 to the outside world
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
