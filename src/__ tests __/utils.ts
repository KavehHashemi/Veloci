export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockISINs = [
  "DE123", //short
  "DE12345678 1", //contains space
  "DE12345678!1", //contains non-alphanumeric character
  "XX1234567891", //invalid country code
  "DE123456789a", //non-digit last character
  "DE1234567891", //valid ISIN
];
