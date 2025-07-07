
interface CountryWeightData {
  country: string;
  averageWeightKg: number;
}

export const averageWeightMen: CountryWeightData[] = [
  { country: "Netherlands", averageWeightKg: 85.5 },
  { country: "Germany", averageWeightKg: 82.4 },
  { country: "USA", averageWeightKg: 90.0 },
  { country: "United Kingdom", averageWeightKg: 80.0 },
  { country: "France", averageWeightKg: 78.5 },
  { country: "Italy", averageWeightKg: 75.0 },
  { country: "Spain", averageWeightKg: 76.5 },
  { country: "Japan", averageWeightKg: 65.0 },
  { country: "China", averageWeightKg: 67.0 },
  { country: "Australia", averageWeightKg: 83.0 },
  { country: "Canada", averageWeightKg: 82.0 },
  { country: "Brazil", averageWeightKg: 73.0 },
  { country: "India", averageWeightKg: 60.0 },
  { country: "Russia", averageWeightKg: 75.0 },
  { country: "Mexico", averageWeightKg: 76.0 },
];

export const averageWeightWomen: CountryWeightData[] = [
  { country: "Netherlands", averageWeightKg: 72.0 },
  { country: "Germany", averageWeightKg: 69.5 },
  { country: "USA", averageWeightKg: 77.0 },
  { country: "United Kingdom", averageWeightKg: 67.0 },
  { country: "France", averageWeightKg: 65.0 },
  { country: "Italy", averageWeightKg: 62.0 },
  { country: "Spain", averageWeightKg: 63.5 },
  { country: "Japan", averageWeightKg: 54.0 },
  { country: "China", averageWeightKg: 56.0 },
  { country: "Australia", averageWeightKg: 70.0 },
  { country: "Canada", averageWeightKg: 69.0 },
  { country: "Brazil", averageWeightKg: 61.0 },
  { country: "India", averageWeightKg: 50.0 },
  { country: "Russia", averageWeightKg: 62.0 },
  { country: "Mexico", averageWeightKg: 63.0 },
];

// Get all unique countries from both datasets
export const getAllCountries = (): string[] => {
  const menCountries = averageWeightMen.map(data => data.country);
  const womenCountries = averageWeightWomen.map(data => data.country);
  const allCountries = [...new Set([...menCountries, ...womenCountries])];
  return allCountries.sort();
};
