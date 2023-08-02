# Shopify + Next.js

### Next.js

`$ npx create-next-app@latest`

`$ npm i graphql apollo`

```typescript
import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.NEXT_PUBLIC_API_URL!]: {
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
      },
    },
  },
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
```

layout

- Header
- {Main}
- Footer

/

- Hero
- Produtos (Home Page)

### Shopify

- Create account
- Select the Basic Plan or higher
  - $1,00 USD/mounth first 3 mounths.
  - $19,00 USD/mounth after trial
  - 2 members (me & owner)
- Add products
- Headless plug-in
- Shopify GraphiQL App plug-in
- Custom Domain
  - R$40,00 BRL/year
