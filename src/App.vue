<script setup lang="ts">
import { ref } from 'vue';
import { useTasksStore } from './stores/tasks';
import { useDebounce } from './composables/useDebounce';
const store = useTasksStore();

const testInput = ref('');
const devounceInput = useDebounce(testInput,500)


</script>

<template>
  

  <div>
    <input type="text" v-model="testInput">
    <br>
    {{ testInput }}
    <br>
    {{ devounceInput }}
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
