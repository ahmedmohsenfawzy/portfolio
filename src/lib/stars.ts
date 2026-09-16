function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function starBoxShadow(count: number, seed: number, field = 2000) {
  const rand = mulberry32(seed);
  const dots: string[] = [];
  for (let i = 0; i < count; i += 1) {
    dots.push(`${Math.floor(rand() * field)}px ${Math.floor(rand() * field)}px #fff`);
  }
  return dots.join(',');
}
