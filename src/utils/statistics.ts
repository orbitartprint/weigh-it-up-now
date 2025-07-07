
// Standard normal cumulative distribution function
// This approximates the CDF of a standard normal distribution using the error function
export function standardNormalCDF(z: number): number {
  // Approximation of the error function using Abramowitz and Stegun formula
  const erf = (x: number): number => {
    // Constants for the approximation
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    // Save the sign of x
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  };

  // CDF of standard normal distribution
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

export function calculateWeightPercentile(
  userWeightKg: number,
  meanWeightKg: number,
  standardDeviation: number = 15.4
): number {
  const zScore = (userWeightKg - meanWeightKg) / standardDeviation;
  const percentile = standardNormalCDF(zScore) * 100;
  return Math.round(percentile * 10) / 10; // Round to 1 decimal place
}
