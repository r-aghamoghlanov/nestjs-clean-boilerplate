# --- ALPINE IMAGE ---
FROM node:22-alpine AS alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

# --- BASE ---
# Setup pnpm and turbo on the alpine base
FROM alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add turbo --global

# --- PRUNER ---
# Prune the objects
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune worker --docker

# --- BUILDER ---
# Build the project and its dependencies
FROM base AS builder
WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/json/ .
# First install the dependencies (as they change less often)
RUN pnpm install

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

RUN pnpm turbo build --filter=worker
RUN pnpm prune --prod --no-optional

# --- RUNNER ---
FROM alpine AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 worker
USER worker

WORKDIR /app
COPY --from=builder /app .

CMD ["node", "apps/worker/dist/main.js"]