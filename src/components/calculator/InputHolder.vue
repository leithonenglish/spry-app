<template>
  <div class="flex border-2 border-gray-300 border-solid rounded-[4px]">
    <span
      v-if="!!icon"
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
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "InputHolder",
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
div {
  :deep(input) {
    @apply font-bold text-gray-600 text-2xl tracking-widest h-14 w-full border-none outline-none px-3;
  }
}
</style>
