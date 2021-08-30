import { CalculationPeriod } from "../calculation-period";

export default interface Settings {
  period: CalculationPeriod;
  startDate?: Date;
  endDate?: Date;
}
