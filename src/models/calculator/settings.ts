import { CalculationPeriod } from "../calculation-period";
import { PayrollFrequency } from "../payroll-frequency.enum";

export default interface Settings {
  period: CalculationPeriod;
  grossPay: number;
  frequency: PayrollFrequency;
}
