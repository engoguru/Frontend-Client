### Stage 1: Build the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build


### Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Clean default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (default command is fine)
CMD ["nginx", "-g", "daemon off;"]


