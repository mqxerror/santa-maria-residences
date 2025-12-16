import pg from 'pg'
const { Client } = pg

const client = new Client({
  host: '38.97.60.181',
  port: 5433,
  user: 'postgres',
  password: 'postgres123',
  database: 'postgres',
})

const createTableSQL = `
-- Create apartments table
CREATE TABLE IF NOT EXISTS apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  floor INTEGER NOT NULL CHECK (floor >= 7 AND floor <= 41),
  unit VARCHAR(1) NOT NULL CHECK (unit IN ('A', 'B', 'C', 'D', 'E', 'F')),
  size_sqm INTEGER NOT NULL CHECK (size_sqm > 0),
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by VARCHAR(255),

  -- Ensure unique floor + unit combination
  UNIQUE(floor, unit)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_apartments_floor ON apartments(floor);
CREATE INDEX IF NOT EXISTS idx_apartments_status ON apartments(status);
`

const enableRLS = `
-- Enable Row Level Security
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read apartments (public website)
DROP POLICY IF EXISTS "Public read access" ON apartments;
CREATE POLICY "Public read access" ON apartments
  FOR SELECT USING (true);

-- Policy: Only authenticated users with allowed emails can update
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

-- Policy: Service role can do anything (for seeding)
DROP POLICY IF EXISTS "Service role full access" ON apartments;
CREATE POLICY "Service role full access" ON apartments
  FOR ALL USING (auth.role() = 'service_role');
`

const triggerSQL = `
-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_apartments_updated_at ON apartments;
CREATE TRIGGER update_apartments_updated_at
  BEFORE UPDATE ON apartments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`

const seedSQL = `
-- Clear existing data
TRUNCATE apartments;

-- Insert apartments for floors 7-39 (6 units each)
INSERT INTO apartments (floor, unit, size_sqm, status)
SELECT
  f.floor,
  u.unit,
  CASE u.unit
    WHEN 'A' THEN 85
    WHEN 'B' THEN 92
    WHEN 'C' THEN 78
    WHEN 'D' THEN 78
    WHEN 'E' THEN 92
    WHEN 'F' THEN 85
  END as size_sqm,
  'available'
FROM generate_series(7, 39) AS f(floor)
CROSS JOIN (VALUES ('A'), ('B'), ('C'), ('D'), ('E'), ('F')) AS u(unit);

-- Floor 40: 4 larger units
INSERT INTO apartments (floor, unit, size_sqm, status) VALUES
  (40, 'A', 120, 'available'),
  (40, 'B', 135, 'available'),
  (40, 'E', 135, 'available'),
  (40, 'F', 120, 'available');

-- Floor 41: 2 premium penthouses
INSERT INTO apartments (floor, unit, size_sqm, status) VALUES
  (41, 'A', 180, 'available'),
  (41, 'F', 180, 'available');

-- Set random statuses for demo
UPDATE apartments SET status = 'sold'
WHERE id IN (SELECT id FROM apartments ORDER BY random() LIMIT 30);

UPDATE apartments SET status = 'reserved'
WHERE status = 'available' AND id IN (
  SELECT id FROM apartments WHERE status = 'available' ORDER BY random() LIMIT 15
);
`

async function runMigrations() {
  try {
    await client.connect()
    console.log('Connected to PostgreSQL')

    console.log('Creating apartments table...')
    await client.query(createTableSQL)
    console.log('✓ Table created')

    console.log('Creating trigger...')
    await client.query(triggerSQL)
    console.log('✓ Trigger created')

    console.log('Enabling RLS...')
    try {
      await client.query(enableRLS)
      console.log('✓ RLS enabled')
    } catch (err) {
      console.log('⚠ RLS warning (auth schema may not exist):', err.message)
    }

    console.log('Seeding apartments...')
    await client.query(seedSQL)
    console.log('✓ Apartments seeded')

    // Get counts
    const result = await client.query(`
      SELECT status, COUNT(*) as count
      FROM apartments
      GROUP BY status
      ORDER BY status
    `)
    console.log('\nApartment counts:')
    result.rows.forEach(row => {
      console.log(`  ${row.status}: ${row.count}`)
    })

    const total = await client.query('SELECT COUNT(*) FROM apartments')
    console.log(`\nTotal apartments: ${total.rows[0].count}`)

  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  } finally {
    await client.end()
    console.log('\nDone!')
  }
}

runMigrations()
