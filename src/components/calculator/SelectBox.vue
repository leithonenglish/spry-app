<template>
  <select
    class="font-semibold text-gray-600 h-14 pl-3 pr-12 border-2 border-gray-300 border-solid rounded-[4px] appearance-none"
    v-model="value"
    @change="$emit('update:modelValue', $event)"
  >
    <option v-for="{ value, text } in options" :key="value" :value="value">{{ text }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type SelectBoxOptions = {
  value: any,
  text: string
};

export default defineComponent({
  name: "SelectBox",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    options: Array as PropType<SelectBoxOptions[]>
  },
  data() {
    return { value: undefined as any }
  },
  beforeMount() {
    this.value = this.modelValue;
  }
})
</script>

<style lang="scss" scoped>
select {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='1.5em' height='1.5em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 16 16'><g fill='currentColor'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></g></svg>");
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
}
</style>
