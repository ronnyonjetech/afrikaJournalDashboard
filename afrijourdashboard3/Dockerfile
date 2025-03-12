# Use Node.js LTS as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application
COPY . .

# Expose the correct Vite port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "dev"]
