import { defineStore } from "pinia";
import type {Task , TaskPriority , CreateTaskDTO, ApiResponse, UpdateTaskDTO, TaskStatus} from '../types/index'
import { useLocalStorage } from "../composables/useLocalStorage";

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
    },
    actions:{

        addTask(dto: CreateTaskDTO): ApiResponse<Task>{
            try{
                const newTask = {
                ...dto,
                id:crypto.randomUUID(),
                createdAt:Date.now(),
                updatedAt:Date.now(),
                
            }
            this.tasks.push(newTask);
            
            saveToStorage(this.tasks);
            return {
                success:true,
                data:newTask,
                error:null
            }

            } catch(e){
                    return {
                    success:false,
                    data:null,
                    error:"не удалось создать задачу"
                }
            }
        },

        updateTask(dto:UpdateTaskDTO): ApiResponse<Task>{
            try{
                const index = this.tasks.findIndex(task => task.id === dto.id)
                if (index === -1) return { success: false, data: null, error: 'Задача не найдена' }

                this.tasks[index] = { ...this.tasks[index], ...dto, updatedAt: Date.now() } as Task
                saveToStorage(this.tasks);
                return { success: true, data: this.tasks[index], error: null }
            } catch(e){
                return{success:false,data:null,error:"Не получилось обновить задание"}
            }
        },

        deleteTask(id:string): ApiResponse<boolean>{
            try{
                const index = this.tasks.findIndex(task => task.id === id)
                if(index === -1) return {success:false,data:false,error:'Задача не найдена'}
                this.tasks.splice(index,1);
                saveToStorage(this.tasks);
                return {success:true,data:true,error:null}                
            } catch(e){
                return {success:false,data:null,error:"не получилдось удалить задание"}
            }
        },

        moveTask(id: string, status: TaskStatus): void {
            const index = this.tasks.findIndex(task => task.id === id)
            if (index === -1) return
            this.tasks[index]!.status = status
            saveToStorage(this.tasks);
        },

        clearCompleated(): ApiResponse<number>{
            try{
                const countBefore = this.tasks.length;
                this.tasks = this.tasks.filter(task => task.status !== 'done');
                const deletedTasks = countBefore - this.tasks.length;

                if(deletedTasks === 0) return {success:false,data:0,error:'Нет выполенных заданий'}
                saveToStorage(this.tasks);
                return {success:true,data:deletedTasks,error:null} 
            } catch(e){
                return {success:false,data:null,error:'Не удалось удалить все выполненные задания'}
            }
        },
        loadFromStorage():void{
            this.tasks = loadFromStorage()
        }
    }
})


const saveToStorage = (tasks: Task[])=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const loadFromStorage = ():Task[] =>{
    try{
        const storedData = localStorage.getItem('tasks');
        return storedData ? JSON.parse(storedData) : []
    }catch(e){
        return []
    }
}


