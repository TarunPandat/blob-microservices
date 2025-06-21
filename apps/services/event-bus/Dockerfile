# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install @swc/core@1.12.5


# Copy source code
COPY . .

COPY tsconfig.json ./

# Build TypeScript into JavaScript (optional if ts-node in production)
RUN npm run build

# Stage 2: Production
FROM node:18

WORKDIR /app

# Copy only production deps & build output
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config.js ./config.js
COPY --from=builder /app/config/.env.production ./config/.env.production

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "-r", "./config.js", "./dist"]
