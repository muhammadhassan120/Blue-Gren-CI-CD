# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine
WORKDIR /usr/src/app
# Copy only the compiled code and production dependencies
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

# NestJS defaults to port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]