<template>
  <hr v-if="divider" class="my-5" />
  <div class="flex flex-col justify-between">
    <h1 class="text-sm text-gray-700 font-semibold tracking-wide mb-3">
      <slot name="title"></slot>
      <template v-if="!$slots['title']">{{ title }}</template>
    </h1>
    <h2 :class="['text-xl font-semibold tracking-wider', amountStyle]">{{ toCurrency(amount) }}</h2>
    <p v-if="!!$slots['description'] || description" class="text-sm mt-3">
      <slot name="description"></slot>
      <template v-if="!$slots['description']">{{ description }}</template>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: "SummaryItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    state: {
      type: String as PropType<"default" | "positive" | "negative">,
      default: "default"
    },
    divider: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    amountStyle(): string {
      const styles = {
        "default": "text-gray-600",
        "positive": "text-green-600",
        "negative": "text-red-600"
      }
      return styles[this.state];
    }
  },
  methods: {
    toCurrency(value: number) {
      return new Intl.NumberFormat('en-JM', { style: 'currency', currency: 'JMD' }).format(value);
    }
  }
})
</script>
