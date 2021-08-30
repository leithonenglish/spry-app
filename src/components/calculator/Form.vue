<template>
  <div class="flex flex-col mt-10 w-full min-w-[450px] max-w-lg">
    <div class="flex flex-col">
      <h1 class="group-heading">Calculation Setting</h1>
      <ControlHolder title="Type">
        <RadioButtonGroup v-model="settings.period" :options="periodOptions" />
      </ControlHolder>
    </div>
    <div class="flex flex-col mt-16">
      <h1 class="group-heading">Salary Details</h1>
      <ControlHolder title="Type">
        <RadioButtonGroup v-model="salary.type" :options="salaryTypeOptions" />
      </ControlHolder>
      <ControlHolder v-if="!isPaidHourly" title="Frequency" class="mt-10">
        <SelectBox
          v-model="salary.frequency"
          :options="salaryFrequncyOptions"
        />
      </ControlHolder>
      <div
        v-if="isPaidHourly"
        :class="[
          'mt-10 grid grid-rows-1',
          isPaidHourly ? 'grid-cols-2 gap-6' : 'grid-cols-1',
        ]"
      >
        <ControlHolder title="Hours Worked Per Day">
          <NumberInput
            v-model.lazy="salary.hoursWorkedPerDay"
            type="default"
            :min="1"
            :max="24"
          />
        </ControlHolder>
        <ControlHolder title="Days Worked Per Week">
          <NumberInput
            v-model.lazy="salary.daysWorkedPerWeek"
            type="default"
            :min="1"
            :max="7"
          />
        </ControlHolder>
      </div>
      <ControlHolder title="Amount" class="mt-10">
        <NumberInput v-model.lazy="salary.amount" type="money" />
      </ControlHolder>
      <ControlHolder title="Other Income" class="mt-10">
        <NumberInput v-model.lazy="salary.otherIcome" type="money" />
      </ControlHolder>
      <ControlHolder
        title="Are you over 65 years old?"
        :stacked="false"
        class="mt-10"
      >
        <Switch v-model="salary.over65" />
      </ControlHolder>
      <ControlHolder title="Are you retired?" :stacked="false" class="mt-10">
        <Switch v-model="salary.retired" />
      </ControlHolder>
    </div>
    <div class="flex flex-col mt-16">
      <h1 class="group-heading">Pension Details</h1>
      <ControlHolder
        title="Do you make Pension contributions?"
        :stacked="false"
      >
        <Switch v-model="pension.active" />
      </ControlHolder>
      <template v-if="pension.active">
        <ControlHolder title="Type" class="mt-10">
          <RadioButtonGroup
            v-model="pension.type"
            :options="pensionTypeOptions"
          />
        </ControlHolder>
        <ControlHolder title="Amount" class="mt-10">
          <NumberInput
            v-model.lazy="pension.amount"
            :type="pensionIsFixed ? 'money' : 'percentage'"
          />
        </ControlHolder>
      </template>
    </div>
    <button
      class="
        text-white
        font-semibold
        flex
        items-center
        justify-center
        bg-crayola-blue
        px-5
        py-6
        mt-14
        rounded-[4px]
        shadow-md
      "
    >
      Calculate tax breakdown
      <Icon icon="line-md:arrow-right" class="ml-4 text-xl" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Icon } from "@iconify/vue";
import NumberInput from "./NumberInput.vue";
import SelectBox from "./SelectBox.vue";
import ControlHolder from "./ControlHolder.vue";
import { Switch, RadioButtonGroup } from "../controls";
import { SalaryType, SalaryFrequency, PensionType } from "../../models/enums";
import { Pension, Salary, Settings } from "../../models/calculator";

export default defineComponent({
  name: "CalculatorForm",
  components: {
    Icon,
    NumberInput,
    SelectBox,
    ControlHolder,
    Switch,
    RadioButtonGroup,
  },
  props: {
    settings: {
      type: Object as PropType<Settings>,
      required: true,
    },
    salary: {
      type: Object as PropType<Salary>,
      required: true,
    },
    pension: {
      type: Object as PropType<Pension>,
      required: true,
    },
  },
  data() {
    return {
      periodOptions: [
        {
          value: 1,
          text: "Entire Year",
          icon: "ph:calendar-check-duotone",
        },
        {
          value: 2,
          text: "Date Range",
          icon: "ph:calendar-duotone",
        },
      ],
      salaryTypeOptions: [
        {
          value: SalaryType.FIXED,
          text: "Fixed Salary",
          icon: "ph:currency-circle-dollar-duotone",
        },
        {
          value: SalaryType.HOURLY,
          text: "Paid Hourly",
          icon: "ph:clock-clockwise-duotone",
        },
      ],
      salaryFrequncyOptions: [
        { value: SalaryFrequency.ANNUALLY, text: "Per Annum" },
        { value: SalaryFrequency.MONTHLY, text: "Per Month" },
        { value: SalaryFrequency.SEMI_MONTHLY, text: "Semi-Monthly" },
        { value: SalaryFrequency.BI_WEEKLY, text: "Bi-Weekly" },
        { value: SalaryFrequency.WEEKLY, text: "Weekly" },
        { value: SalaryFrequency.DAILY, text: "Daily" },
      ],
      pensionTypeOptions: [
        {
          value: PensionType.FIXED,
          text: "Fixed Amount",
          icon: "ph:currency-dollar",
        },
        {
          value: PensionType.PERCENTAGE,
          text: "Percentage",
          icon: "ph:percent-duotone",
        },
      ],
    };
  },
  computed: {
    isPaidHourly(): boolean {
      return this.salary.type === SalaryType.HOURLY;
    },
    pensionIsFixed(): boolean {
      return this.pension.type === PensionType.FIXED;
    },
  },
  watch: {
    "salary.type": {
      handler(value: SalaryType) {
        this.salary.amount = 0;
        this.salary.frequency =
          value === SalaryType.HOURLY
            ? SalaryFrequency.HOURLY
            : SalaryFrequency.ANNUALLY;
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.group-heading {
  @apply text-xl text-gray-600 font-bold tracking-wider pb-2 mb-6 border-b-2 border-solid border-gray-200;
}
</style>
