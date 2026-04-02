export const TRADES = [
  "Roofing",
  "Framing / Carpentry",
  "Electrical",
  "Plumbing",
  "HVAC",
  "Concrete / Foundation",
  "Drywall / Finishing",
  "Painting",
  "Siding / Exterior",
  "Flooring",
  "Insulation",
  "Demolition",
  "Excavation / Grading",
  "Landscaping / Hardscaping",
  "Window / Door Installation",
  "Masonry / Brick",
  "General Residential",
] as const;

export type Trade = (typeof TRADES)[number];
