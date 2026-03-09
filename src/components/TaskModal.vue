<template>
    <Teleport to="body">
        <div class="backdrop" @click="emit('close')">
            <TaskForm 
            @click.stop 
            :task="props.task ?? undefined" 
            @submit="emit('submit', $event)" 
            @cancel="emit('close')"/>
       </div>
    </Teleport>        
</template>


<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Task } from '../types';
import TaskForm from './TaskForm.vue';

const emit = defineEmits(['close','submit'])

interface Props{
    task?:Task|null
}
const props = defineProps<Props>();


onMounted(()=>{
    document.addEventListener('keydown',handleKeydown);
})

onUnmounted(()=>{
    document.removeEventListener('keydown',handleKeydown);
})
function handleKeydown(event:KeyboardEvent){
    if(event.key === 'Escape') emit('close');
}

</script>


<style scoped>

.backdrop{
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: var(--color-modal);
    width: 100%;
    height: 100%;
}


</style>