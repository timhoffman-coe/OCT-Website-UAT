const { defineConfig } = require('prisma/config');

module.exports = defineConfig({
  schema: './schema.prisma',
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
