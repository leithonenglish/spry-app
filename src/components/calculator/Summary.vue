<template>
  <div class="py-10 px-7 my-10 ml-14 min-w-[500px] bg-white rounded-md shadow-lg">
    <SummaryItem title="Income" :amount="income" />
    <SummaryItem v-if="pension > 0" title="Pension" :amount="pension" state="positive" divider />
    <SummaryItem
      v-if="over65"
      :amount="80000"
      title="Tax Relief"
      state="positive"
      description="Tax relief given to citizens over 65 years old"
      divider
    />
    <SummaryItem
      v-if="retired"
      :amount="80000"
      title="Tax Relief"
      state="positive"
      description="Tax relief given to citizens who are retired"
      divider
    />
    <SummaryItem :amount="nis" title="National Insurance Scheme" state="negative" divider>
      <template #description>
        Calculated at
        <b class="text-crayola-blue/80">3%</b> of your salary before any other taxes are deducted and is capped at
        <b
          class="text-crayola-blue/80"
        >$7,500.00</b> monthly.
      </template>
    </SummaryItem>
    <SummaryItem :amount="educationTax" title="Eduction Tax" state="negative" divider>
      <template #description>
        Calculated at
        <b class="text-crayola-blue/80">2.25%</b> of your salary
      </template>
    </SummaryItem>
    <SummaryItem :amount="nht" title="National Housing Trust" state="negative" divider>
      <template #description>
        Calculated at
        <b class="text-crayola-blue/80">2%</b> of your salary
      </template>
    </SummaryItem>
    <SummaryItem :amount="incomeTax" title="Income Tax" state="negative" divider>
      <template #description>
        Calculated at
        <b class="text-crayola-blue/80">25%</b> of your the first
        <b class="text-crayola-blue/80">$6,000,000.00</b> of your salary, then at
        <b class="text-crayola-blue/80">30%</b> for the anything over.
      </template>
    </SummaryItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SummaryItem from './SummaryItem.vue'

export default defineComponent({
  name: "CalculatorSummary",
  components: {
    SummaryItem
  },
  props: {
    income: {
      type: Number,
      required: true
    },
    pension: {
      type: Number,
      required: true
    },
    incomeTax: {
      type: Number,
      required: true
    },
    nht: {
      type: Number,
      required: true
    },
    nis: {
      type: Number,
      required: true
    },
    educationTax: {
      type: Number,
      required: true
    },
    over65: {
      type: Boolean,
      default: false
    },
    retired: {
      type: Boolean,
      default: false
    }
  }
})
</script>
