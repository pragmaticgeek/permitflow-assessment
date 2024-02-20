# PermitFlow Take-home assessment



## Created with

```bash
pnpm create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter trpc-prisma-starter
cd trpc-prisma-starter
pnpm
pnpm dx
```

## Features

Based on:

https://you.ashbyhq.com/permitflow/assignment/41ead6f6-8cef-4d9c-bf58-98e9551733dc



### Requirements

- Node >= 18.0.0
- Postgres

## Database Setup


The database is assumed to have a user ``postgres`` with the password ``postgres`` on ``localhost`` on default port ``5432``.  The database name is ``permitflow-assessment``

This can be overriden with the following environment variable setting or editing the ``.env`` file.

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/permitflow-assessment



### Run project in dev mode

```bash
pnpm install
pnpm dx
```

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-unit  # runs normal Vitest unit tests
pnpm test-e2e   # runs e2e tests
pnpm lint       # runs linting with eslint

```

