type TaskStatus = 'todo' | 'in-progress' | 'done';
type TaskPriority = 'low' | 'medium' | 'high' ;

interface Task {
    id:string,
    title:string,
    description:string,
    status : TaskStatus,
    priority: TaskPriority,
    createdAt:number,
    updatedAt:number,
    tags:string[],
}

type CreateTaskDTO = Omit<Task , 'id'|'createdAt'|'updatedAt'>
type UpdateTaskDTO = Partial<Task> & Pick<Task , 'id'>;

interface ApiResponse<T> {
    success:boolean,
    data:T | null,
    error:string | null
}
