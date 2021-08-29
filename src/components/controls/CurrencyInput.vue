<template>
  <input ref="inputRef" type="text" :value="formattedValue" />
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default defineComponent({
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props: any) {
    const { formattedValue, inputRef, setValue } = useCurrencyInput(
      props.options
    );
    const { modelValue } = toRefs(props);
    watch(modelValue, (value: number) => {
      setValue(value);
    });

    return { inputRef, formattedValue };
  },
});
</script>
