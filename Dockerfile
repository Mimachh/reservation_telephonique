##### DEPENDENCIES

FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
COPY prisma ./

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./

# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#   else echo "Lockfile not found." && exit 1; \
#   fi
RUN npm ci
##### BUILDER

FROM --platform=linux/amd64 node:16-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLIENTVAR
WORKDIR /app

COPY prisma/schema.prisma /app/prisma/schema.prisma

VOLUME ["/app/prisma"]

RUN npx prisma migrate dev --name init

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

##### RUNNER

FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json




COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static



USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

# docker build -t reservation_telephonique:v1 --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar --build-arg DATABASE_URL="mysql://root:root@host.docker.internal:3306/reservation_telephonique" .
# docker run -p 3000:3000 -e DATABASE_URL="mysql://root:root@host.docker.internal:3306/reservation_telephonique" reservation_telephonique:v1