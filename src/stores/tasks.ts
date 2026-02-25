import { defineStore } from "pinia";
import type {Task , TaskPriority} from '../types/index'


export const useTasksStore = defineStore('tasks',{
    state:()=>{
        return{
            tasks: [] as Task[],
            searchQuery: '' as string,
            filterPriority : 'all' as TaskPriority | 'all',
            isLoading:false,
        }
    },
    getters:{
        tasksByStatus:(state)=>{
            return state.tasks.reduce((acc,currentItem)=>{
                acc[currentItem.status].push(currentItem);
                return acc;
            },{'todo':[] as Task[],'in-progress':[] as Task[],'done':[] as Task[]})
        },
        totalByStatus:(state)=>{
            return {
                'todo':state.tasks.filter(item => item.status === 'todo').length,
                'in-progress':state.tasks.filter(item => item.status === 'in-progress').length,
                'done':state.tasks.filter(item => item.status === 'done').length,
            }
        },
        filteredTasks:(state)=>{
            return state.tasks.filter(item => ((state.filterPriority === 'all' || item.priority === state.filterPriority) && item.title.includes(state.searchQuery)))
        },
        completionPercentage(state):number{
            if (state.tasks.length === 0) return 0;
            const doneTasks = this.totalByStatus.done;
            const procent = (doneTasks*100)/state.tasks.length
            return procent;
        }
    }
})