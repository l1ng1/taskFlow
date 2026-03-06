<template>

    <div class="columns">
        <KanbanColumn class="todo_column" status="todo" :tasks="store.tasksByStatus.todo" title="Need to do"/>
        <KanbanColumn class="inprogress_column" status="in-progress" :tasks="store.tasksByStatus['in-progress']" title="Tasks in progress"/>
        <KanbanColumn class="done_column" status="done" :tasks="store.tasksByStatus.done" title="Done"/>
    </div>
    
</template>



<script setup lang="ts">
import KanbanColumn from './KanbanColumn.vue';
import { useTasksStore } from '../stores/tasks';
const store = useTasksStore();

</script>



<style scoped>
.columns{
    display: flex;
    justify-content: space-around;
    gap: 0px 20px;
}

</style>