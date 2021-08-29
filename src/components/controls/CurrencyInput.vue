<template>
  <input ref="inputRef" type="text" :value="formattedValue" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'

type CurrencyInputProps = {
  modelValue: number,
  options: Object
}

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object
  },
  setup(props: any) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  }
})
</script>