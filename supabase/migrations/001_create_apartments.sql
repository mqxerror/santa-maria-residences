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

-- Create index for faster queries
CREATE INDEX idx_apartments_floor ON apartments(floor);
CREATE INDEX idx_apartments_status ON apartments(status);

-- Enable Row Level Security
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read apartments (public website)
CREATE POLICY "Public read access" ON apartments
  FOR SELECT USING (true);

-- Policy: Only authenticated users with allowed emails can update
-- Replace these emails with actual admin emails
CREATE POLICY "Admin update access" ON apartments
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND
    auth.email() IN (
      'admin@santamaria.com',
      'sales@santamaria.com',
      'agent1@santamaria.com',
      'agent2@santamaria.com',
      'agent3@santamaria.com'
    )
  );

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_apartments_updated_at
  BEFORE UPDATE ON apartments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
