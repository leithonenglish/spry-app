<template>
  <div class="flex p-16">
    <div class="flex flex-col w-full lg:mx-auto lg:max-w-6xl">
      <h1 class="font-bold text-3xl">Jamaica Tax Calculator</h1>
      <p class="mt-3">
        Calculate income tax and payroll taxes and other applicable deductions.
      </p>
      <div class="flex justify-start items-start">
        <Form :settings="settings" :salary="salary" :pension="pension" />
        <Summary
          :income="income"
          :pension="pensionAmount"
          :incomeTax="incomeTax"
          :nht="nht"
          :nis="nis"
          :educationTax="educationTax"
          :over65="salary.over65"
          :retired="salary.retired"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Summary, Form } from "../components/calculator";
import { SalaryType, SalaryFrequency, PensionType } from "../models/enums";
import { Pension, Salary, Settings } from "../models/calculator";
import { mapState } from "vuex";
import { CalculationPeriod } from "../models/calculation-period";

export default defineComponent({
  name: "Calculator",
  components: {
    Summary,
    Form,
  },
  data() {
    return {
      settings: {
        period: CalculationPeriod.FULL_YEAR,
      } as Settings,
      salary: {
        type: SalaryType.FIXED,
        frequency: SalaryFrequency.ANNUALLY,
        amount: 0,
        hoursWorkedPerDay: 8,
        daysWorkedPerWeek: 1,
        retired: false,
        over65: false,
        otherIcome: 0,
      } as Salary,
      pension: {
        active: false,
        type: PensionType.FIXED,
        amount: 0,
      } as Pension,
      calculated: false,
    };
  },
  computed: {
    ...mapState([
      "taxThreshold",
      "over65TaxReliefAmount",
      "retiredTaxReliefAmount",
      "incomeTaxSettings",
      "nisSettings",
      "educationTaxPercentage",
      "nhtPercentage",
    ]),
    pensionIsFixed(): boolean {
      return this.pension.type === PensionType.FIXED;
    },
    income(): number {
      const {
        amount,
        daysWorkedPerWeek,
        hoursWorkedPerDay,
        otherIcome,
        frequency,
      } = this.salary;
      const incomeByFrequency = {
        [`${SalaryFrequency.ANNUALLY}`]: amount,
        [`${SalaryFrequency.MONTHLY}`]: amount * 12,
        [`${SalaryFrequency.SEMI_MONTHLY}`]: amount * 24,
        [`${SalaryFrequency.BI_WEEKLY}`]: amount * 26,
        [`${SalaryFrequency.WEEKLY}`]: amount * 52,
        [`${SalaryFrequency.HOURLY}`]:
          amount * 52 * daysWorkedPerWeek * hoursWorkedPerDay,
      };
      return (
        parseFloat(`${incomeByFrequency[`${frequency}`] || 0}`) + otherIcome
      );
    },
    pensionAmount(): number {
      return this.pensionIsFixed
        ? this.pension.amount
        : (this.pension.amount / 100) * this.income;
    },
    statutoryIncome(): number {
      let amount = this.income - this.nis;
      if (this.pension.active && this.pension.amount) {
        amount -= this.pensionAmount;
      }
      if (this.salary.over65) {
        amount -= this.retiredTaxReliefAmount;
      }
      if (this.salary.retired) {
        amount -= this.retiredTaxReliefAmount;
      }
      return amount;
    },
    hasStatutoryIncome(): boolean {
      return this.statutoryIncome > 0;
    },
    nis(): number {
      const { percentage, monthlyCap } = this.nisSettings;
      const montlyIcome = this.income / 12;
      const amount = montlyIcome * percentage;
      if (amount > monthlyCap) {
        return monthlyCap * 12;
      }
      return amount * 12;
    },
    educationTax(): number {
      return this.hasStatutoryIncome
        ? this.statutoryIncome * this.educationTaxPercentage
        : 0;
    },
    nht(): number {
      return this.income * this.nhtPercentage;
    },
    incomeTax(): number {
      const { baseIncomeTaxBracket, basePercentage, overBracketPercentage } =
        this.incomeTaxSettings;
      if (this.statutoryIncome > this.taxThreshold) {
        if (this.statutoryIncome > 6000000) {
          return (
            (baseIncomeTaxBracket - this.taxThreshold) * basePercentage +
            (this.statutoryIncome - baseIncomeTaxBracket) *
              overBracketPercentage
          );
        }
        return this.statutoryIncome * 0.25;
      }
      return 0;
    },
  },
  watch: {
    "pension.active": {
      handler(value: boolean) {
        if (!value) {
          this.pension.amount = 0;
        }
      },
    },
  },
});
</script>
