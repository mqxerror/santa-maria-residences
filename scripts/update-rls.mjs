import pg from 'pg'
const { Client } = pg

const client = new Client({
  host: '38.97.60.181',
  port: 5433,
  user: 'postgres',
  password: 'postgres123',
  database: 'postgres',
})

const updateRLS = `
-- Update RLS policy for admin access
DROP POLICY IF EXISTS "Admin update access" ON apartments;
CREATE POLICY "Admin update access" ON apartments
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND
    auth.email() IN (
      'admin@santamaria.com',
      'sales@santamaria.com',
      'wassim@mercan.com'
    )
  );
`

async function run() {
  await client.connect()
  await client.query(updateRLS)
  console.log('RLS policy updated!')
  await client.end()
}

run()
