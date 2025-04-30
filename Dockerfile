# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and .env file
COPY package*.json ./
COPY .env ./

# Install dependencies (including devDependencies for the build process)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Stage 2: Serve
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built application and necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

# Expose the desired port (default for Next.js)
EXPOSE 3030

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3030

# Command to run the application in production mode
CMD ["npm", "run", "start"]
