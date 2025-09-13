# Build: docker build -t backend .
# Run: docker run -p 3000:3000 backend
FROM node:22-alpine AS builder
WORKDIR /app
COPY . /app/
ENV npm_config_loglevel=error
RUN npm ci --force
RUN npm run build

FROM node:22-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY package-lock.json .
ENV NODE_ENV=production
RUN npm ci --ignore-scripts --force
CMD ["npm", "run", "start:prod", "--ignore-scripts"]
