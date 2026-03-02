import { ref } from "vue";
import { watch } from "vue";
import type { Ref } from "vue";


export function useDebounce<T>(value:Ref<T>,delay:number):Ref<T>{
    let timer:ReturnType<typeof setTimeout>;
    let debouncedValue = ref(value.value) as Ref<T>

    watch(value,() =>{
        clearTimeout(timer);
         
        timer = setTimeout(()=>{
            debouncedValue.value = value.value;
        },delay);
    })

    return debouncedValue
}