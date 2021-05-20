import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTodoListACType, removeTodoListACType} from "./todolists-reducer";

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
    debugger
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
            let newTask = {id: v1(), title: action.title, isDone: false}
            //достаем нужный массив по todoListId
            let tasks = state[action.todoListId]
            // let newTasks = [newTask, ...tasks]
            stateCopy[action.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            let tasks = state[action.todoListId]                                                    //чекбокс
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {   // псевдоистина
                task.isDone = action.isDone
                // tasks[todoListId] = task
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            //достаем нужный массив по todoListId
            let tasks1 = state[action.todoListId]
            //найдем нужную таску
            let task = tasks1.find(t => t.id === action.taskId)
            //изменим таску если она нашлась
            if (task) {                                      // псевдоистина
                task.title = action.newTitle
                // tasks[todoListId] = task
                //засетаем в стейт копию объекта, что бы React отреагировал перерисовкой
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)
export const addTaskAC = (title: string, todoListId: string) => ({type: 'ADD-TASK', title, todoListId} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todoListId
} as const)
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    newTitle,
    todoListId
} as const)


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListACType
    | removeTodoListACType
