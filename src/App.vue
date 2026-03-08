<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTasksStore } from './stores/tasks';
import { useDebounce } from './composables/useDebounce';
import type { Task } from './types';
import KanbanBoard from './components/KanbanBoard.vue';
import BaseInput from './components/BaseInput.vue';
import TaskModal from './components/TaskModal.vue';
import type { CreateTaskDTO } from './types';
import { provide } from 'vue';

const store = useTasksStore();

const SearchInput = ref('');
const debounceInput = useDebounce(SearchInput,500)
const taskPrioritySearch = ref('all');
const modalStatus = ref<boolean>(false);
const taskToEdit = ref<Task|null>(null);

provide('delete',(id:string)=>store.deleteTask(id));
provide('edit',(task:Task)=>{
  taskToEdit.value = task;
  modalStatus.value = true;
})


watch(debounceInput,(val)=>store.searchQuery = val);
watch(taskPrioritySearch,(val)=> store.filterPriority = val as 'all');

function handleSubmit(event:CreateTaskDTO){
  if(taskToEdit.value !== null) store.updateTask({ ...taskToEdit.value , ...event});
  else store.addTask(event);
  modalStatus.value = false
}

</script>

<template>
  <header>
    <h1 class="app_name">TaskFlow</h1>
    <div class="search_section">
      <BaseInput :model-value="SearchInput" type="search" @update:model-value="SearchInput = $event" />
      <select v-model="taskPrioritySearch" name="priority">
        <option value="all">all</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button @click="modalStatus = true ;taskToEdit=null">Add Task</button>
    </div>
  </header>
  <main>
    <TaskModal :task="taskToEdit" v-if="modalStatus" @close="modalStatus = false" @submit="handleSubmit($event)"/>
    <KanbanBoard/>
  </main>


</template>

<style scoped>

</style>
