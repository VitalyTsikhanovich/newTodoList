import axios from "axios";
import {FilterValueType} from "../redux/todolists-reducer";


const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e66d6d23-ce52-4d6b-97de-dbd90e8d428f'
    }
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...setting                                                    // withCredentials: true,
    //headers: {
    //  'API-KEY': 'e66d6d23-ce52-4d6b-97de-dbd90e8d428f'
    // }
})


export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
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

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses{
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
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

export type UpdateTask={
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}




type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}


export const todoListApi = {
    getTodoList() {
        let promise = instance.get<Array<TodoListType>>('todo-lists')
        return promise
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },
    deleteTodoList(id: string) {

        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todoListId: string) {
        let promise = instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
    },
    updateTask(todoListId: string, taskId: string,  model:UpdateTask ) {
        return instance.put<UpdateTask>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}