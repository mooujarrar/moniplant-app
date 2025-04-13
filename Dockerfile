# Use the official Node.js image as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Install `serve` for serving the app
RUN npm install -g serve

# Use a lightweight image for the production environment
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built files and dependencies from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expose port 1234
EXPOSE 1234

# Start the Next.js application using `serve`
CMD ["serve", "-s", ".next", "-l", "1234"]
