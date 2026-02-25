export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' ;

export interface Task {
    id:string,
    title:string,
    description:string,
    status : TaskStatus,
    priority: TaskPriority,
    createdAt:number,
    updatedAt:number,
    tags:string[],
}

export type CreateTaskDTO = Omit<Task , 'id'|'createdAt'|'updatedAt'>
export type UpdateTaskDTO = Partial<Task> & Pick<Task , 'id'>;

export interface ApiResponse<T> {
    success:boolean,
    data:T | null,
    error:string | null
}


