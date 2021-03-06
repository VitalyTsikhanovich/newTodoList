import axios from 'axios'

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e0364a45-b776-45ce-a5e2-732ef20bc482',
    },
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting,
})

/*
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
     withCredentials: true,
    headers: {
     'API-KEY': 'e66d6d23-ce52-4d6b-97de-dbd90e8d428f'
    }
})
*/
export const todoListApi = {
    getTodoList() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {
            title: title,
        })
    },
    deleteTodoList(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todoListId: string) {
        let promise = instance.get<GetTasksResponse>(
            `todo-lists/${todoListId}/tasks`
        )
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todoListId}/tasks/${taskId}`
        )
    },
    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(
            `todo-lists/${todoListId}/tasks`,
            {title: taskTitle}
        )
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTask) {
        return instance.put<ResponseType<TaskType>>(
            `todo-lists/${todoListId}/tasks/${taskId}`,
            model
        )
    },
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType>(`auth/login`, data)
    },
    logout(){
       return instance.delete<ResponseType>(`auth/login`)
    },
    me(){
        return instance.get<ResponseType<{id: number; email: string; login: string}>>(`auth/me`)
}
}


// types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTask = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

// type _CreateTodoListResponseType={
//     resultCode: number
//     messages: Array<string>             //string[]
//     data: {
//         item: TodoListType
//     }
// }
// type DeleteUpdateTodoListResponseType={
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }
// type _UpdateTodoListResponseType={
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }
