import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodoListACType, RemoveTodoListACType, setTodoListACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListApi} from "../api/todoList-api";
import {Dispatch} from "redux";

// export let todoListId1 = v1()
// export let todoListId2 = v1()

// let initialState: TasksStateType = {
//     [todoListId1]: [
//         {id: v1(), title: 'CSS', isDone: true},
//         {id: v1(), title: 'React', isDone: false},
//     ],
//     [todoListId2]: [
//         {id: v1(), title: 'CSS', isDone: true},
//         {id: v1(), title: 'React', isDone: false},
//     ]
// }

let initialState: TasksStateType = {}


export type InitialStateType = typeof initialState

export const tasksReducer = (state: InitialStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}     // делаем копию стейта
            let tasks = state[action.todoListId]                                                       // удаление таски
            let filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            //достаем нужный массив по todoListId
            let tasks = stateCopy[action.todoListId]
             let newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = newTasks                   // [newTask, ...tasks]
            return stateCopy
        }
        // case "UPDATE-TASK":{
        //     let todoListTask= state[action.todoListId]
        //     let newTasksArray= todoListTask.map(t=> t.id === action.taskId ? {...t, ...action.model}: t)
        // }

        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todoListId]                     //чекбокс
            state[action.todoListId] = todolistTasks.map(t => t.id === action.taskId ? {
                ...t,
                status: action.status
            } : t)
            return ({...state})
        }
        case "CHANGE-TASK-TITLE": {
            //достаем нужный массив по todoListId
            let todolistTasks = state[action.todoListId]
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            // state[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            //найдем нужную таску
             state[action.todoListId] = newTasksArray
            return ({...state})
        }
        case "ADD-TODOLIST": {
            // return {
            //     ...state,
            //     [action.todoList.id]: []
            // }
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todoList.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASK":{
            const stateCopy = {...state}
            stateCopy[action.todoListIs] = action.tasks
            return stateCopy
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)
export const addTaskAC = (title: string, todoListId: string) => ({type: 'ADD-TASK', title, todoListId} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => ({type: 'CHANGE-TASK-STATUS', taskId, status, todoListId} as const)
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todoListIs: string) => ({type: 'SET-TASK', tasks, todoListIs} as const)
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => ({type: 'UPDATE-TASK', taskId, model, todoListId} as const)


// type UpdateDomainTaskModelType={
//     title?: string
//     description?: string
//     status?: number
//     priority?: number
//     startDate?: string
//     deadline?: string
// }


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type setTaskACType = ReturnType<typeof setTaskAC>
// export type UpdateTaskACType = ReturnType<typeof updateTaskAC>

type ActionsType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodoListACType
    | RemoveTodoListACType
    | setTodoListACType
    | setTaskACType
// | UpdateTaskACType

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.getTasks(todoListId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todoListId))
            })
    }
}
