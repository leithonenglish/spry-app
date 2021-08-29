<template>
  <div class="flex border-2 border-gray-300 border-solid rounded-[4px]">
    <span
      v-if="hasIcon"
      class="
        flex
        items-center
        justify-center
        border-r-2 border-gray-300 border-solid
        px-3
      "
    >
      <Icon :icon="icon" class="text-3xl text-gray-500" />
    </span>
    <currency-input
      class="
        font-bold
        text-gray-600 text-2xl
        tracking-widest
        h-14
        w-full
        border-none
        outline-none
        px-3
      "
      :options="options"
      v-model="amount"
      @focus="blurred = false"
      @blur="onBlur"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Icon } from "@iconify/vue";
import { CurrencyInput } from "../controls";

export default defineComponent({
  name: "NumberInput",
  emits: ["update:modelValue", "change"],
  components: {
    Icon,
    CurrencyInput,
  },
  props: {
    modelValue: {
      type: Number,
    },
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String as PropType<"default" | "money" | "percentage">,
      default: "default",
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  data() {
    return { amount: 0, blurred: false };
  },
  beforeMount() {
    this.amount = this.modelValue || 0;
  },
  computed: {
    hasIcon(): boolean {
      return this.type !== "default";
    },
    icon() {
      return this.type === "money"
        ? "ph:currency-dollar"
        : "ph:percent-duotone";
    },
    options() {
      const max = this.type === "percentage" ? 100 : this.max;
      const min = this.type === "percentage" ? 0 : this.min;
      const valueRange =
        typeof min !== undefined || typeof max !== undefined
          ? { min, max }
          : null;
      return {
        currency: "USD",
        currencyDisplay: "hidden",
        precision: 2,
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: true,
        hideNegligibleDecimalDigitsOnFocus: false,
        autoDecimalDigits: true,
        exportValueAsInteger: false,
        autoSign: true,
        useGrouping: true,
        valueRange,
      };
    },
  },
  watch: {
    modelValue(value: number) {
      this.amount = value;
    },
    amount(value: any) {
      if (!this.modelModifiers.lazy || this.blurred) {
        this.$emit("update:modelValue", value);
      }
    },
  },
  methods: {
    onBlur(event: any) {
      if (this.modelModifiers.lazy) {
        this.$emit("update:modelValue", parseFloat(event.target.value));
      }
      this.blurred = true;
    },
  },
});
</script>
