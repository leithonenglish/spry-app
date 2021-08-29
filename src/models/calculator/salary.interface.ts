import { SalaryFrequency, SalaryType } from "../enums";

export default interface Salary {
  type: SalaryType;
  frequency: SalaryFrequency;
  amount: number;
  hoursWorkedPerDay: number;
  daysWorkedPerWeek: number;
  retired: boolean;
  over65: boolean;
  otherIcome: 0;
}
