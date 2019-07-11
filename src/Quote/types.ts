export type Quote = {
  termMonths: number;
  totalBeforeTaxes: number;
  monthlyPremium: number;
  total: number;
  taxes: number;
};

export const example: Quote = {
  termMonths: 12,
  totalBeforeTaxes: 1583,
  monthlyPremium: 141.5,
  total: 1698,
  taxes: 115,
};
