import postgres from 'pg';

const { Pool } = postgres;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
