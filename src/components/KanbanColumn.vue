<template>

<div @dragover.prevent @drop="dragAndDrop.onDrop(props.status)" class="kanban_column">

    <h2>{{ props.title }}({{ props.tasks.length }})</h2>

    <div class="tasks">
        <TaskCard v-for="task in props.tasks" :key="task.id" :task="task"/>
    </div>

</div>


</template>
<script setup lang="ts">
import TaskCard from './TaskCard.vue';
import type { Task, TaskStatus } from '../types';
import { useDragAndDrop } from '../composables/useDragAndDrop';

const dragAndDrop = useDragAndDrop();
interface Props{
    status:TaskStatus,
    tasks:Task[],
    title:string,
}

const props = defineProps<Props>();





</script>
<style scoped>


</style>