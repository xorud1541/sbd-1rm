// 남성 Wilks 계수
const MALE_COEFFICIENTS = {
  a: -216.0475144,
  b: 16.2606339,
  c: -0.002388645,
  d: -0.00113732,
  e: 7.01863e-6,
  f: -1.291e-8,
};

export function calcWilks(bodyWeight: number, total: number): number {
  if (bodyWeight <= 0 || total <= 0) return 0;

  const { a, b, c, d, e, f } = MALE_COEFFICIENTS;
  const bw = bodyWeight;

  const denominator =
    a +
    b * bw +
    c * Math.pow(bw, 2) +
    d * Math.pow(bw, 3) +
    e * Math.pow(bw, 4) +
    f * Math.pow(bw, 5);

  if (denominator <= 0) return 0;

  const coefficient = 500 / denominator;
  const wilks = total * coefficient;

  return Math.round(wilks * 10) / 10;
}
