
# Use the official Node.js 14 image as a base for building the app
FROM node:14-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Build the app for production
RUN npm run build

# Use the official Apache HTTP Server image as base for serving the app
FROM httpd:alpine

# Copy the built app files from the builder stage to the Apache document root
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# Apache by default listens on port 80, so no need to expose any additional ports
# Apache by default listens on port 80, so change the port to 3000
EXPOSE 3000

# Update Apache configuration to use port 3000
RUN sed -i 's/80/3000/g' /usr/local/apache2/conf/httpd.conf

# (Optional) If you need to customize the Apache configuration, you can copy your custom configuration file
# COPY ./path/to/your/httpd.conf /usr/local/apache2/conf/httpd.conf
