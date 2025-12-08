import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "./prisma/schema.prisma",

  engine: "classic",

  datasource: {
    directUrl: env("DIRECT_URL"),
    url: env("DATABASE_URL"),
  },
});
