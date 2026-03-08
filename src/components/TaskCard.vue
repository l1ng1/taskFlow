<template>
        <div @dragstart="dragAndDrop.onDragStart(props.task.id)" draggable="true" class="taskCard">
            <div class="shell">
                <h3>{{ props.task.title }}</h3>
                <p :class="priorityClass">{{ props.task.priority }}</p>
                <ul class="tags">
                    <li class="tag" v-for="tag in props.task.tags">
                        {{ tag }}
                    </li>
                </ul>
                <p>Created:{{ formatedCreationDate }}</p>
                <p>Updated:{{ formatedUpdatedDate }}</p>
            </div>
            <button @click="onDelete(props.task.id)">Delete</button>
            <button @click="onEdit(props.task)">Edit</button>
        </div>

</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '../types';
import { useDragAndDrop } from '../composables/useDragAndDrop';
import { inject } from 'vue';
const dragAndDrop = useDragAndDrop();

interface Props{
    task:Task
}
const onDelete = inject<(id:string)=>void>('delete',()=>{})
const onEdit = inject<(task:Task|null)=>void>('edit',()=>{});
const props = defineProps<Props>()


const formatedCreationDate = computed(() => {
    const date = new Date(props.task.createdAt)
    return `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()}`
})

const formatedUpdatedDate = computed(()=>{
    const date = new Date(props.task.updatedAt)
    return `${date.getDate().toString().padStart(2,'0')}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getFullYear()}`
})


const priorityClass = computed(() => {
    return `priority-${props.task.priority}`
})

</script>