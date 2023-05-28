import type { Knex } from "knex";
require('dotenv').config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: (process.env as any).DB_CLIENT || 'mysql',
    connection: {
      host: (process.env as any).DB_HOST,
      port: (process.env as any).DB_PORT,
      user: (process.env as any).DB_USER_NAME,
      password: (process.env as any).DB_PASSWORD,
      database: (process.env as any).DB_NAME,
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
