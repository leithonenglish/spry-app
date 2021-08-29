import { SalaryPeriod, SalaryType } from "../enums";

export default interface Salary {
  type: SalaryType;
  period: SalaryPeriod;
  amount: number;
  retired: boolean;
  over65: boolean;
  otherIcome: 0;
}
