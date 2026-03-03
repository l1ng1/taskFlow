<template>


<div class="search_block">

    <div v-if="props.type === 'textarea'" class="input">
        <textarea
        :value="props.modelValue" 
        @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"
        name="search_input" 
        :placeholder="props.placeholder"
        ></textarea>
        <p v-show="props.error">{{ props.error }}</p>
    </div>
    <div v-else class="input">
        <input 
        :value="props.modelValue" 
        @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"
        name="search_input" 
        :placeholder="props.placeholder">
        <p v-show="props.error">{{ props.error }}</p>
    </div>

</div>


</template>


<script lang="ts" setup>
interface Props {
    modelValue: string,
    placeholder?:string,
    type?:'text'|'search'|'textarea',
    error?:string
}

const props = defineProps<Props>()
const emit = defineEmits(["update:modelValue"])

</script>


<style scoped>


</style>