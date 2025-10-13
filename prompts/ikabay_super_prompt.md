1) Repo layout (mono-repo minimal)
ikabay/
  apps/
    web/                # Next.js (PWA, Tailwind, i18n)
    api/                # Node/Nest/Express + Prisma + REST/GraphQL
    agents/             # multi-agents orchestrator
  packages/
    shared/             # shared TS types & utils
  prisma/
    schema.prisma
    migrations/
    seed.ts
  .github/
    workflows/
      ci.yml
      deploy.yml
      cron-benchmark.yml
  .vscode/
    launch.json
    tasks.json
    extensions.json
  .devcontainer/
    devcontainer.json
  package.json
  turbo.json            # (optional if you use Turborepo)
  .env.example
  README.md

2) package.json (root)
{
  "name": "ikabay-monorepo",
  "private": true,
  "scripts": {
    "dev:web": "pnpm --filter @ikabay/web dev",
    "dev:api": "pnpm --filter @ikabay/api dev",
    "dev:all": "concurrently -k \"pnpm dev:api\" \"pnpm dev:web\"",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy",
    "prisma:seed": "ts-node prisma/seed.ts",
    "agents:run": "pnpm --filter @ikabay/agents start",
    "check": "pnpm lint && pnpm test && pnpm build"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "turbo": "^2.0.0",
    "typescript": "^5.4.0",
    "ts-node": "^10.9.2",
    "prisma": "^5.9.0"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}


Adjust to npm/yarn if you don’t use pnpm.

3) GitHub Actions — CI (lint + test + build + prisma)

Create .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  ci:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    services:
      postgres:
        image: postgres:16
        ports: [ "5432:5432" ]
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: ikabay_ci
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    env:
      DATABASE_URL: postgresql://postgres:postgres@localhost:5432/ikabay_ci
      NODE_ENV: test
      ERP_MODE: mock

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Prisma Generate & Migrate
        run: |
          pnpm prisma:generate
          pnpm prisma:migrate
          pnpm prisma:seed

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test -- --ci

      - name: Build
        run: pnpm build

4) GitHub Actions — Deploy (web + api)

Create .github/workflows/deploy.yml

name: Deploy

on:
  workflow_dispatch:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    env:
      # Shared envs
      NODE_ENV: production
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      ERP_MODE: ${{ secrets.ERP_MODE }}
      WHATSAPP_TOKEN: ${{ secrets.WHATSAPP_TOKEN }}
      WEB3AUTH_CLIENT_ID: ${{ secrets.WEB3AUTH_CLIENT_ID }}
      SOLANA_PRIVATE_KEY: ${{ secrets.SOLANA_PRIVATE_KEY }}
      SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Prisma generate & migrate
        run: |
          pnpm prisma:generate
          pnpm prisma:migrate

      # --- Deploy API (Render/Railway/Custom) via Docker or CLI ---
      - name: Build API Docker image
        run: |
          docker build -t ghcr.io/${{ github.repository }}-api:$(git rev-parse --short HEAD) apps/api
      - name: Login GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Push API image
        run: |
          docker tag ghcr.io/${{ github.repository }}-api:$(git rev-parse --short HEAD) ghcr.io/${{ github.repository }}-api:latest
          docker push ghcr.io/${{ github.repository }}-api:$(git rev-parse --short HEAD)
          docker push ghcr.io/${{ github.repository }}-api:latest

      # If you deploy API to Railway/Render, add their official actions/CLI here.

      # --- Deploy Web to Vercel ---
      - name: Install Vercel CLI
        run: pnpm add -g vercel@latest
      - name: Pull Vercel env
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Web
        working-directory: apps/web
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Web
        working-directory: apps/web
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}


If you prefer to deploy API to Vercel too (as Next.js API routes), skip the Docker part and keep both in one Next.js app. If using Railway/Render, add their deploy step with your service id/token.

5) GitHub Actions — Scheduled benchmark & agents orchestration

Create .github/workflows/cron-benchmark.yml

name: Nightly Benchmarks & Agents

on:
  schedule:
    - cron: "0 3 * * *"   # every day 03:00 UTC
  workflow_dispatch:

jobs:
  agents:
    runs-on: ubuntu-latest
    timeout-minutes: 25
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      ERP_MODE: ${{ secrets.ERP_MODE }}
      WEB3AUTH_CLIENT_ID: ${{ secrets.WEB3AUTH_CLIENT_ID }}
      SOLANA_PRIVATE_KEY: ${{ secrets.SOLANA_PRIVATE_KEY }}
      WHATSAPP_TOKEN: ${{ secrets.WHATSAPP_TOKEN }}
      SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
      SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - name: Install
        run: pnpm install --frozen-lockfile
      - name: Run Agents (sourcing/pricing/logistics/reverse/treasury)
        run: pnpm agents:run

  benchmarks:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - name: Compare Providers & Emit Report
        run: |
          node scripts/benchmark/index.mjs
      - name: Upload Benchmark Artifact
        uses: actions/upload-artifact@v4
        with:
          name: provider-benchmark-report
          path: out/benchmark-report/*.md


pnpm agents:run should execute your orchestrator to: refresh product shortlists, recalc prices, plan logistics, run weekly rewards if it’s the right day, send WhatsApp summaries to admins, etc.

6) VS Code — tasks & debugging

.vscode/tasks.json

{
  "version": "2.0.0",
  "tasks": [
    { "label": "Dev: API", "type": "shell", "command": "pnpm dev:api", "problemMatcher": [] },
    { "label": "Dev: Web", "type": "shell", "command": "pnpm dev:web", "problemMatcher": [] },
    { "label": "Dev: All", "type": "shell", "command": "pnpm dev:all", "problemMatcher": [] },
    { "label": "DB: Migrate", "type": "shell", "command": "pnpm prisma:migrate" },
    { "label": "DB: Seed", "type": "shell", "command": "pnpm prisma:seed" },
    { "label": "Agents: Run", "type": "shell", "command": "pnpm agents:run" }
  ]
}


.vscode/launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "API (Node)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/api/src/index.ts",
      "preLaunchTask": "DB: Migrate",
      "outFiles": ["${workspaceFolder}/apps/api/dist/**/*.js"],
      "envFile": "${workspaceFolder}/.env"
    },
    {
      "name": "Web (Next.js)",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm --filter @ikabay/web dev"
    },
    {
      "name": "Agents Orchestrator",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/agents/src/index.ts",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}


.vscode/extensions.json

{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "rangav.vscode-thunder-client",
    "bradlc.vscode-tailwindcss"
  ]
}

7) Dev Container (optional but great)

.devcontainer/devcontainer.json

{
  "name": "Ikabay Dev",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "postCreateCommand": "pnpm install",
  "forwardPorts": [3000, 4000],
  "remoteEnv": {
    "DATABASE_URL": "postgresql://postgres:postgres@localhost:5432/ikabay_dev"
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "prisma.prisma",
        "bradlc.vscode-tailwindcss"
      ]
    }
  }
}


Pair with a docker-compose.yml if you want local Postgres + Redis.

8) Secrets to set in GitHub (Settings → Secrets → Actions)

DATABASE_URL (Postgres prod)

VERCEL_TOKEN (deploy web)

ERP_MODE (mock | odoo | erpnext)

WHATSAPP_TOKEN (Cloud API)

WEB3AUTH_CLIENT_ID (wallet onboarding)

SOLANA_PRIVATE_KEY (base58/private key for distributor wallet)

SUPABASE_URL, SUPABASE_ANON_KEY (or Neon/PlanetScale)

(optionnel) RENDER_API_KEY / RAILWAY_TOKEN si tu déploies l’API là-bas

9) .env.example (root)
# App
NODE_ENV=development
PORT=4000

# DB
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ikabay_dev

# Auth/Wallet
WEB3AUTH_CLIENT_ID=your_web3auth_id
SOLANA_PRIVATE_KEY=your_solana_private_key_base58

# WhatsApp
WHATSAPP_TOKEN=your_meta_whatsapp_cloud_api_token

# ERP
ERP_MODE=mock
ERP_URL=
ERP_TOKEN=

# Supabase/Storage
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Rewards
REWARDS_CYCLE=weekly
KYC_WITHDRAW_THRESHOLD=100

10) Prisma quick starter (schema heads-up)

Just the heads (you’ll expand as needed):

datasource db { provider = "postgresql"; url = env("DATABASE_URL") }
generator client { provider = "prisma-client-js" }

model User {
  id        String @id @default(cuid())
  email     String @unique
  password  String?
  role      String  // admin | vendor | client | ops
  locale    String? // fr | gcr | en
  createdAt DateTime @default(now())
  Wallet    Wallet?
}

model Wallet {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  ikb       Decimal  @default(0)
  usdc      Decimal  @default(0)
  createdAt DateTime @default(now())
}

model Product { /* vendorId, pricing, inventory, media, etc. */ }
model Order   { /* userId, totals, status, payments */ }
model Shipment{ /* orderId, carrier, tracking, status */ }
model Return  { /* orderId, status, action */ }
model EventLog{ id String @id @default(cuid()); type String; payload Json; createdAt DateTime @default(now()) }


Run locally:

pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev:all

11) What this gives you

CI: test, lint, build, migrations on every PR/push.

CD: one-click/manual deploy to Vercel (web) + containerized API to GHCR (hook this to Railway/Render/ECS if you want).

Cron: nightly agents (sourcing, pricing, logistics, rewards) + provider benchmarks artifact.

VS Code: F5 debugging for API/agents, tasks for DB & dev servers.

Devcontainer: reproducible environment (optional).

Secrets wired cleanly.
