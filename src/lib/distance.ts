const cityIndex: Record<string, number> = {
  Madrid: 1,
  Barcelona: 2,
  Valencia: 3,
  Sevilla: 4,
  "Málaga": 5,
  Bilbao: 6,
};

export function simulateDistance(origin: string, city: string) {
  const a = cityIndex[origin] ?? 7;
  const b = cityIndex[city] ?? 8;
  return Math.abs(a - b) * 4 + 2;
}
