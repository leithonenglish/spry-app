<template>
  <div :class="grid ? ['grid', gridColsStyle, 'gap-5'] : 'flex justify-items-stretch items-center'">
    <button
      v-for="{ text, value, icon } in options"
      :key="value"
      :class="['radio-btn', { 'selected': value == selectedValue }]"
      @click.prevent="onOptionSelected(value)"
    >
      <Icon
        v-if="icon"
        :icon="icon"
        class="h-10 w-10 mr-3 text-gray-400 fill-current transition-colors"
      />
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
type RadioButtonItem = {
  value: any,
  text: String,
  icon?: String | null
}
import { defineComponent, PropType } from 'vue'
import { Icon } from '@iconify/vue'
export default defineComponent({
  name: 'RadioButtonGroup',
  emits: ['update:modelValue', 'selected'],
  components: {
    Icon
  },
  props: {
    modelValue: {
      required: true
    },
    grid: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array as PropType<RadioButtonItem[]>,
      required: true
    }
  },
  data() {
    return {
      selectedValue: null as any | null
    }
  },
  beforeMount() {
    this.selectedValue = this.modelValue;
  },
  methods: {
    onOptionSelected(value: any) {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
  computed: {
    gridColsStyle() {
      return `grid-cols-${this.options.length}`;
    }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  .radio-btn {
    @apply m-0;
  }
}
.radio-btn {
  @apply font-semibold text-sm text-gray-500 tracking-wide flex items-center justify-center border-2 border-platinum border-solid rounded-md min-w-40 px-5 py-3 ml-7 transition-colors outline-none first:ml-0 hover:border-glaucous;

  &.selected {
    @apply text-crayola-blue border-crayola-blue/60 bg-alice-blue shadow-md;

    svg {
      @apply text-crayola-blue/60;
    }
  }
}
</style>
