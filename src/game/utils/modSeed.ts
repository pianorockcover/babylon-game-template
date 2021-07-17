export const modSeed = (
  seed: number,
  digitIndexes: number[] = [0, 3],
  minMax = [0, 10]
): number => {
  const seedStr = String(seed < 1000 || seed > 9999 ? 1234 : seed);
  const divider = parseInt(
    digitIndexes.map((i) => seedStr.charAt(i)).join(""),
    10
  );

  const mod = Number(String(Math.trunc(seed % divider)).charAt(0));

  return mod < minMax[0] ? minMax[0] : mod > minMax[1] ? minMax[1] : mod;
};
