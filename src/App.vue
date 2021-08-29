<template>
  <div class="h-full w-full grid grid-cols-[60px,1fr] grid-rows-1">
    <Sidebar />
    <div class="overflow-auto h-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sidebar } from './components';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  }
})
</script>
