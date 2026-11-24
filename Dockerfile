# Single production image: Node serves the API (/api) and the built React app.

# ---- 1) build the frontend ----
FROM node:20-alpine AS web-build
WORKDIR /build/apps/web
COPY apps/web/package*.json ./
RUN npm install
COPY apps/web/ ./
RUN npm run build

# ---- 2) runtime ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app/apps/api
COPY apps/api/package*.json ./
RUN npm ci --omit=dev
COPY apps/api/src ./src
# app.js serves ../../web/dist relative to src/
COPY --from=web-build /build/apps/web/dist /app/apps/web/dist

EXPOSE 5000
CMD ["node", "src/server.js"]
