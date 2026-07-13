// Each category has units defined relative to a base unit (factor = 1 base unit in this unit... actually stored as: value_in_base = value * factor)
export const UNIT_CATEGORIES = {
  length: {
    base: 'm',
    units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  },
  weight: {
    base: 'kg',
    units: { mg: 0.000001, g: 0.001, kg: 1, ton: 1000, lb: 0.453592, oz: 0.0283495 },
  },
  speed: {
    base: 'm/s',
    units: { 'm/s': 1, 'km/h': 0.277778, mph: 0.44704, knot: 0.514444 },
  },
  area: {
    base: 'm2',
    units: { mm2: 0.000001, cm2: 0.0001, m2: 1, km2: 1000000, acre: 4046.86, hectare: 10000, ft2: 0.092903 },
  },
  volume: {
    base: 'l',
    units: { ml: 0.001, l: 1, m3: 1000, gal: 3.78541, qt: 0.946353, cup: 0.24 },
  },
  time: {
    base: 's',
    units: { s: 1, min: 60, hour: 3600, day: 86400, week: 604800, month: 2629800, year: 31557600 },
  },
};

export function convertLinear(value, from, to, category) {
  const def = UNIT_CATEGORIES[category];
  if (!def) return 0;
  const base = (Number(value) || 0) * def.units[from];
  return base / def.units[to];
}

export function convertTemperature(value, from, to) {
  const v = Number(value) || 0;
  let celsius;
  if (from === 'C') celsius = v;
  else if (from === 'F') celsius = (v - 32) * (5 / 9);
  else celsius = v - 273.15; // K

  if (to === 'C') return celsius;
  if (to === 'F') return celsius * (9 / 5) + 32;
  return celsius + 273.15; // K
}
