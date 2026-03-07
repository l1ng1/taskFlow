<template>
    <Teleport to="body">
        <div class="backdrop" @click="emit('close')">
            <TaskForm @click.stop />
       </div>
    </Teleport>        
</template>


<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import TaskForm from './TaskForm.vue';

const emit = defineEmits(['close'])

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

</style>