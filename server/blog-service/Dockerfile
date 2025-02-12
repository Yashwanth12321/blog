FROM node:22.13.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Install TypeScript globally
RUN npm install -g ts-node typescript

# Expose port (ensure it matches `server.listen(port)`)
EXPOSE 5001

# Start the server using ts-node
CMD ["ts-node", "server.ts"]
