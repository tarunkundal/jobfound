import { defineConfig, env } from "prisma/config";
import { loadEnvFile } from "process";

loadEnvFile();

export default defineConfig({
  // Path to your Prisma schema
  schema: "./prisma/schema.prisma",

  // Engine type (classic is fine; alternative is 'binary')
  engine: "classic",

  // Datasource configuration
  datasource: {
    // Use the direct connection URL for schema-changing commands
    directUrl: env("DIRECT_URL"),

    // Use the pooled connection URL for application runtime
    url: env("DATABASE_URL"),
  },
});
