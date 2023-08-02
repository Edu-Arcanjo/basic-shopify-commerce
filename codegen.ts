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
