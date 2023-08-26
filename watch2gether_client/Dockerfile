# Stage 1: Build the React application
FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the final image with Nginx
FROM nginx

# Copy the built assets from the builder stage to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy your nginx.conf (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# The default Nginx container command will start Nginx automatically, no need to specify it here
