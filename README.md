## Setup

Make sure to install the dependencies:

```bash {"id":"01J4NN5HP192K7QCN4JMMA57S7"}
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash {"id":"01J4NN5HP32SF15SJE3JCZW5J2"}
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash {"id":"01J4NN5HP32SF15SJE3KDMJ437"}
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash {"id":"01J4NN5HP32SF15SJE3PMP04GE"}
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Nuxt Studio integration

Add `@nuxthq/studio` dependency to your package.json:

```bash {"id":"01J4NN5HP32SF15SJE3T4D5WCJ"}
# npm
npm install --save-dev @nuxthq/studio

# pnpm
pnpm add -D @nuxthq/studio

# yarn
yarn add -D @nuxthq/studio

# bun
bun add -d @nuxthq/studio
```

Add this module to your `nuxt.config.ts`:

```ts {"id":"01J4NN5HP32SF15SJE3VWDNGAJ"}
export default defineNuxtConfig({
  ...
  modules: [
    ...
    '@nuxthq/studio'
  ]
})
```

Read more on [Nuxt Studio docs](https://nuxt.studio/docs/get-started/setup).

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

