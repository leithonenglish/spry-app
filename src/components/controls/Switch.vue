<template>
  <button :class="{ on: isOn }" @click.prevent="onToggle">
    <span></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Switch",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  data() {
    return { isOn: false };
  },
  beforeMount() {
    this.isOn = this.modelValue;
  },
  watch: {
    modelValue(value: boolean) {
      this.isOn = value;
    },
  },
  methods: {
    onToggle() {
      this.isOn = !this.isOn;
      this.$emit("update:modelValue", this.isOn);
      this.$emit("change", this.isOn);
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  @apply relative h-7 w-16 bg-crayola-blue/50 rounded-3xl outline-none transition-colors;

  span {
    @apply absolute top-1 left-1 bg-white h-5 w-5 rounded-1 transition-transform shadow-md;
  }

  &.on {
    @apply bg-crayola-blue;
    span {
      @apply transform translate-x-9;
    }
  }
}
</style>
