# Stage 1: Build the React app
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run app with serve (simple static server)
FROM node:20-alpine

WORKDIR /app

# Install 'serve' to run the production build
RUN npm install -g serve

# Copy build folder from previous stage
COPY --from=builder /app/build ./build

EXPOSE 3000

# Serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
