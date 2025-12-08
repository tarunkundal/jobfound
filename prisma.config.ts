import { defineConfig, env } from "prisma/config";
import { loadEnvFile } from "process";
loadEnvFile()
export default defineConfig({
  schema: "./prisma/schema.prisma",

  engine: "classic",

  datasource: {
    directUrl: env("DIRECT_URL"),
    url: env("DATABASE_URL"),
  },
});
