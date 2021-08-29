<template>
  <div :class="['flex', stacked ? 'flex-col' : 'items-center justify-between']">
    <label class="font-semibold text-gray-500 mb-2">{{ title }}</label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: "ControlHolder",
  props: {
    title: {
      type: String,
      required: true
    },
    stacked: {
      type: Boolean,
      default: true
    }
  }
})
</script>
