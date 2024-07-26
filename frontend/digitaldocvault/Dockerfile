# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a static file server
RUN npm install -g serve

# Serve the app from the build directory
CMD ["serve", "-s", "build"]
