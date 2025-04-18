# Step 1: Build the React app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
# This will generate the build folder at the root level
RUN npm run build 

# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from the build stage into Nginx's directory
COPY --from=build /build /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Run Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
