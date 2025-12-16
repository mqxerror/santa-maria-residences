-- Seed 200 apartments (floors 7-41, units A-F, minus some for penthouse floors)
-- Floor 7-40: 6 units each = 34 floors × 6 = 204 apartments
-- Floor 41: 4 units (penthouse level) = 4 apartments
-- Total adjusted to 200 by having fewer units on top floors

-- Clear existing data
TRUNCATE apartments;

-- Insert apartments
-- Using a DO block to generate all apartments
DO $$
DECLARE
  floor_num INTEGER;
  unit_letter VARCHAR(1);
  apt_size INTEGER;
  units VARCHAR(1)[] := ARRAY['A', 'B', 'C', 'D', 'E', 'F'];
BEGIN
  -- Floors 7-39: All 6 units
  FOR floor_num IN 7..39 LOOP
    FOREACH unit_letter IN ARRAY units LOOP
      -- Vary size based on unit type
      CASE unit_letter
        WHEN 'A' THEN apt_size := 85;
        WHEN 'B' THEN apt_size := 92;
        WHEN 'C' THEN apt_size := 78;
        WHEN 'D' THEN apt_size := 78;
        WHEN 'E' THEN apt_size := 92;
        WHEN 'F' THEN apt_size := 85;
      END CASE;

      INSERT INTO apartments (floor, unit, size_sqm, status)
      VALUES (floor_num, unit_letter, apt_size, 'available');
    END LOOP;
  END LOOP;

  -- Floor 40: 4 units (larger penthouses)
  INSERT INTO apartments (floor, unit, size_sqm, status) VALUES
    (40, 'A', 120, 'available'),
    (40, 'B', 135, 'available'),
    (40, 'E', 135, 'available'),
    (40, 'F', 120, 'available');

  -- Floor 41: 2 premium penthouses
  INSERT INTO apartments (floor, unit, size_sqm, status) VALUES
    (41, 'A', 180, 'available'),
    (41, 'F', 180, 'available');
END $$;

-- Set some random statuses for demo purposes
UPDATE apartments SET status = 'sold' WHERE id IN (
  SELECT id FROM apartments ORDER BY random() LIMIT 30
);

UPDATE apartments SET status = 'reserved' WHERE status = 'available' AND id IN (
  SELECT id FROM apartments WHERE status = 'available' ORDER BY random() LIMIT 15
);

-- Verify count
SELECT
  status,
  COUNT(*) as count
FROM apartments
GROUP BY status
ORDER BY status;
