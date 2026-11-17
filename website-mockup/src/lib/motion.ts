export const lenisEasing = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const LENIS_DURATION = 1.05;
