## -*- docker-image-name: "hemilabs/hemiconnector-metrics:1.0.0" -*-

# Build stage
FROM node:22.13.0-alpine3.21@sha256:fce322c9655fe5dc0aac3215bddf35d9907f1a6f59f990c1acace34a669eb86d AS builder

WORKDIR /build

# Install dependencies
COPY package*.json .
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Run stage
FROM alpine:3.21.2@sha256:56fa17d2a7e7f168a043a2712e63aed1f8543aeafdcee47c58dcffe38ed51099

WORKDIR /usr/src/app
RUN apk add --no-cache libstdc++ dumb-init
RUN addgroup --gid 1000 node \
  && adduser --uid 1000 --disabled-password --gecos "" --shell="/sbin/nologin" -G node node \
  && chown node:node ./

COPY --from=builder /usr/local/bin/node /usr/local/bin/
COPY --from=builder /usr/local/bin/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

USER node

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist

CMD ["dumb-init", "node", "/usr/src/app/dist/presentation/cli/CollectMetrics.js"]
