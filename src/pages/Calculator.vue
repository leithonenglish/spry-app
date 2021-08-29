<template>
  <div class="flex p-16">
    <div class="flex flex-col w-full lg:mx-auto lg:max-w-6xl">
      <h1 class="font-bold text-3xl">Jamaica Tax Calculator</h1>
      <p class="mt-3">Calculate income tax and payroll taxes and other applicable deductions.</p>
      <div class="flex justify-start items-start">
        <Form :salary="salary" :pension="pension" />
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
import { defineComponent } from 'vue'
import { Summary, Form } from '../components/calculator'
import { SalaryType, SalaryPeriod, PensionType } from '../models/enums';
import { Pension, Salary } from '../models/calculator';

const THRESHOLD = 1500096;

export default defineComponent({
  name: "Calculator",
  components: {
    Summary,
    Form
  },
  data() {
    return {
      salary: {
        type: SalaryType.FIXED,
        period: SalaryPeriod.ANNUALLY,
        amount: 12760000,
        retired: false,
        over65: false,
        otherIcome: 0
      } as Salary,
      pension: {
        active: true,
        type: PensionType.FIXED,
        amount: 0
      } as Pension,
      calculated: false,
    }
  },
  computed: {
    pensionIsFixed(): boolean {
      return this.pension.type === PensionType.FIXED;
    },
    income(): number {
      const income = {
        [`${SalaryPeriod.ANNUALLY}`]: this.salary.amount,
        [`${SalaryPeriod.MONTHLY}`]: this.salary.amount * 12,
        [`${SalaryPeriod.SEMI_MONTHLY}`]: this.salary.amount * 24,
        [`${SalaryPeriod.BI_WEEKLY}`]: this.salary.amount * 26,
        [`${SalaryPeriod.WEEKLY}`]: this.salary.amount * 52,
        [`${SalaryPeriod.HOURLY}`]: this.salary.amount
      };
      return parseFloat(`${income[this.salary.period] || 0}`) + this.salary.otherIcome;
    },
    pensionAmount(): number {
      return this.pensionIsFixed ? this.pension.amount : this.pension.amount / 100 * this.income;
    },
    statutoryIncome(): number {
      let amount = this.income - this.nis;
      if (this.pension.active && this.pension.amount) {
        amount -= this.pensionAmount;
      }
      if (this.salary.over65) {
        amount -= 80000;
      }
      if (this.salary.retired) {
        amount -= 80000;
      }
      return amount;
    },
    nis(): number {
      const montlyIcome = this.income / 12;
      const amount = montlyIcome * 0.03;
      if (amount > 7500) {
        return 90000;
      }
      return amount * 12;
    },
    educationTax(): number {
      return this.statutoryIncome * 0.0225;
    },
    nht(): number {
      return this.statutoryIncome * 0.02;
    },
    incomeTax(): number {
      if (this.statutoryIncome > THRESHOLD) {
        if (this.statutoryIncome > 6000000) {
          return ((6000000 - THRESHOLD) * 0.25) + ((this.statutoryIncome - 6000000) * 0.3);
        }
        return this.statutoryIncome * 0.25;
      }
      return 0;
    }
  },
  watch: {
    'pension.active': {
      handler(value: boolean) {
        if (!value) {
          this.pension.amount = 0;
        }
      }
    }
  }
})
</script>
