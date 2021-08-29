import { PensionType } from "../enums";

export default interface Pension {
  active: boolean;
  type: PensionType;
  amount: number;
}
