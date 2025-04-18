# Stage 1 - Build React App
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
