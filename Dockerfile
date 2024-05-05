# Use the official Node.js 14 image as a base
FROM node:14-alpine

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

# Serve the app using a simple web server
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]