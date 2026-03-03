import type { Ref } from "vue";
import { ref } from "vue";
import type { TaskStatus } from "../types";
import { useTasksStore } from "../stores/tasks";

const draggingTaskId:Ref<string|null> = ref(null);


export function useDragAndDrop(){
    const store = useTasksStore();
    const onDragStart = (taskId:string)=>{
        if(taskId.length !== 0) draggingTaskId.value = taskId;
        return
    }      

    const onDragOver = (event : DragEvent)=>{
        event.preventDefault()
    }

    const onDrop = (status:TaskStatus)=>{
        if(draggingTaskId.value !== null)   store.moveTask(draggingTaskId.value,status);
        draggingTaskId.value=null;
        return
    }

    return {
        onDragStart,
        onDragOver,
        onDrop,
        draggingTaskId,
    }
}

