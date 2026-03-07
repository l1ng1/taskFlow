<template>


<form method="get">
    <p>Title:</p><br>
    <BaseInput :model-value="formData.title" type="text" @update:model-value="formData.title = $event;titleError=''" :error="titleError"/> <br>
    <p>Description:</p><br>
    <BaseInput type="textarea" :model-value="formData.description" @update:model-value="formData.description = $event" /> <br>
    <p>Priority:</p><br>
    <select v-model="formData.priority">
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
    </select><br>
    <p>Tags:</p><br>
    <BaseInput :model-value="formData.tags.join(',')" type="text" placeholder="tag1,tag2,tag3,..." @update:model-value="formData.tags = $event.split(',').map((item:string)=> item.trim())"/>
    <button @click="handleClick">Submit</button>
    <button @click="emit('cancel')">Cancel</button>
    </form>

</template>


<script setup lang="ts">
import type { Task } from '../types';
import BaseInput from './BaseInput.vue';
import { reactive, ref } from 'vue';

interface Props{
    task?:Task
}
const props = defineProps<Props>();
const emit = defineEmits(['submit','cancel']);

const formData = reactive(
    props.task ? { ...props.task } : {
        title: '',
        description: '',
        status: 'todo',
        priority: 'low',
        tags: []
    }
)

function handleClick(){
    if(formData.title === ''){
        titleError.value = "Title is empty";
        return;
    }
        emit('submit',formData);
    
}



const titleError = ref('');





</script>



<style scoped></style>