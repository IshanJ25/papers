# Step 1: Build stage
FROM node:22-alpine AS builder

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

# Step 2: Production stage
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy only the built application and necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port the application runs on
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]