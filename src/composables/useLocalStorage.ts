import { ref } from "vue"
import type { Ref } from "vue"

export function useLocalStorage<T>(key: string, defaultValue: T): [Ref<T>, (value: T) => void]{
    let initialValue :T = defaultValue;
    try{
        const stored = localStorage.getItem(key);
        if(stored !== null){
            initialValue = JSON.parse(stored);
        }
    } catch(e){
        initialValue = defaultValue;
    }

    const storedValue = ref(initialValue) as Ref<T>


    const setValue = (value:T) : void =>{
        storedValue.value = value
        localStorage.setItem(key,JSON.stringify(value));
    }


    return [storedValue , setValue]
}