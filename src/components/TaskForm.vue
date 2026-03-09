<template>


<form method="get">
    <p>Title:</p>
    <BaseInput :model-value="formData.title" type="text" @update:model-value="formData.title = $event;titleError=''" :error="titleError"/>
    <p>Description:</p>
    <BaseInput type="textarea" :model-value="formData.description" @update:model-value="formData.description = $event" /> 
    <p>Priority:</p>
    <select v-model="formData.priority">
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
    </select>
    <p>Tags:</p>
    <BaseInput :model-value="formData.tags.join(',')" type="text" placeholder="tag1,tag2,tag3,..." @update:model-value="formData.tags = $event.split(',').map((item:string)=> item.trim())"/>
    <div class="btns">
        <button class="submit" @click="handleClick">Submit</button>
        <button class="cancel" @click="emit('cancel')">Cancel</button>
    </div>
    
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



<style scoped>

form{
    width: 340px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border: 1px var(--color-border) solid;
    border-radius: 6px;
    padding: 6px;
    color: var(--color-text-light);
    background-color: var(--color-modal-bg);
}
.btns{
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
}
.btns button{
    border:1px var(--color-border) solid;
    padding: 3px 6px;
    border-radius: 4px;
}
.submit{background-color: var(--color-btn-add);}
.submit:hover{background-color: var(--color-btn-add-hover);}

.cancel{background-color: var(--color-btn-delete);}
.cancel:hover{background-color: var(--color-btn-delete-hover);}

</style>