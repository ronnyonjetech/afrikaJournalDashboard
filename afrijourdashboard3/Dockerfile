# # Use Node.js LTS as the base image
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json first
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --force

# # Copy the rest of the application
# COPY . .

# # Expose the correct Vite port
# EXPOSE 5173

# # Run the Vite development server
# CMD ["npm", "run", "dev"]


# Stage 1: Build the app
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Stage 2: Serve with 'serve'
FROM node:18

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Expose your desired port
EXPOSE 5173

# Serve the built app on port 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
