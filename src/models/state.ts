export default interface State {
  taxThreshold: number;
  over65TaxReliefAmount: number;
  retiredTaxReliefAmount: number;
  incomeTaxSettings: {
    baseIncomeTaxBracket: number;
    basePercentage: number;
    overBracketPercentage: number;
  };
  nisSettings: {
    percentage: number;
    monthlyCap: number;
  };
  educationTaxPercentage: number;
  nhtPercentage: number;
}
