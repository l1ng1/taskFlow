<template>
        <div @dragstart="dragAndDrop.onDragStart(props.task.id)" draggable="true" :class="priorityClass+' taskCard'">
            <div class="shell">
                <h3>{{ props.task.title }}</h3>
                <p>Description:<br>{{ props.task.description }}</p>
                <ul class="tags">
                    <li class="tag" v-for="tag in props.task.tags">
                        {{ tag }}
                    </li>
                </ul>
                <p class="dates">Created:{{ formatedCreationDate }} <br> Updated:{{ formatedUpdatedDate }}</p>
            </div>
            <button class="delete_btn" @click="onDelete(props.task.id)">Delete</button>
            <button class="edit_btn" @click="onEdit(props.task)">Edit</button>
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


<style scoped>

.taskCard{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 6px 0px;
    padding: 5px;
    border-radius: 6px;
}
.shell{
    width: 100%;
}
.priority-low{background-color: var(--color-low);}
.priority-medium{background-color: var(--color-medium);}
.priority-high{background-color: var(--color-high);}

.delete_btn , .edit_btn{
    border:1px var(--color-border) solid;
    border-radius: 4px;
    padding: 3px 6px; 
    color: var(--color-text);
    transition: all 0.15s;
    font-size: 16px;
}
.delete_btn{background-color:var(--color-btn-delete);}
.edit_btn{background-color: var(--color-btn-edit);}

.delete_btn:hover{background-color:var(--color-btn-delete-hover);}
.edit_btn:hover{background-color: var(--color-btn-edit-hover);}

.tags{
    display: flex;
    list-style: none;
    gap: 0px 4px;
}
.tag{
    border:1px var(--color-border) solid;
    font-size: 12px;
    border-radius: 4px;
    padding: 1px 3px;
    margin-top:4px;
    color: var(--color-text-dim);
}
.dates{
    font-size: 12px;
    padding: 1px 3px;
    margin-top:4px;
    color: var(--color-text-dim);
}


.taskCard {
  animation: cardAppear 0.2s ease;
}


@keyframes cardAppear {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

</style>

