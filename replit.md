# DÉSIGN SAÂDA Storefront

An Arabic-first portfolio and custom-order storefront for a Mohammedia upholstery and modern interior studio.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/design-saada run dev` — run the storefront preview
- `pnpm --filter @workspace/design-saada run typecheck` — typecheck the storefront
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/design-saada/src/App.tsx` — storefront content, product catalog, filters, quote form, and WhatsApp enquiry flow
- `artifacts/design-saada/src/index.css` — storefront theme and responsive styling
- `artifacts/design-saada/public/images/` — supplied brand and project photography
- `lib/api-spec/openapi.yaml` — shared API contract (the storefront currently does not use the API)

## Architecture decisions

- The storefront is a static, client-side experience; product listings and photos are local assets.
- Made-to-measure enquiries are sent through WhatsApp; the site does not take payment or promise fixed prices.
- Arabic/RTL is the default, with French and English interface options.

## Product

Visitors can browse and filter 18 project examples, zoom photos, prepare WhatsApp enquiries, and send made-to-measure quote requests with dimensions and location.

## User preferences

- Use the supplied photos and keep the storefront Arabic-first with right-to-left layout.

## Gotchas

- Prices are quote-based; do not add fixed prices or business claims that are not confirmed by the owner.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
