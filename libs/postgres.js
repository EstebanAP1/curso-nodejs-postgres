import postgres from 'pg';

export async function connect() {
  const { Client } = postgres;
  const client = new Client(process.env.DATABASE_URL);

  await client.connect();

  return client;
}
