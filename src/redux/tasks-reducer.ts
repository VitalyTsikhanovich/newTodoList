import {TasksStateType} from "../App";
import {AddTodoListACType, RemoveTodoListACType, setTodoListACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListApi, UpdateTask} from "../api/todoList-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

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
            const newTask = action.task

            //достаем нужный массив по todoListId
            let tasks = stateCopy[newTask.todoListId]
            let newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks                   // [newTask, ...tasks]
            return stateCopy
        }

        case "UPDATE-TASK": {
            let todolistTasks = state[action.todoListId]                     //чекбокс
            state[action.todoListId] = todolistTasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return ({...state})
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todoList.id]: []
            }
            // const stateCopy = {...state}
            // stateCopy[action.todoListId] = []
            // return stateCopy
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
        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListIs] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => ({type: 'UPDATE-TASK', taskId, model, todoListId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todoListIs: string) => ({type: 'SET-TASK', tasks, todoListIs} as const)


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
export type setTaskACType = ReturnType<typeof setTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>

type ActionsType = removeTaskACType
    | addTaskACType
    | AddTodoListACType
    | RemoveTodoListACType
    | setTodoListACType
    | setTaskACType
| UpdateTaskACType

export type UpdateDomainTaskModelType={
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.getTasks(todoListId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todoListId))
            })
    }
}

export const removeTaskTS = (taskId: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.deleteTask(todoListId, taskId)
            .then((res) => {
                const action = removeTaskAC(taskId, todoListId)
                dispatch(action)
            })
    }
}
export const addTaskTS = (title: string, todoListId: string,) => {
    return (dispatch: Dispatch) => {
        todoListApi.createTask(todoListId, title)
            .then((res) => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}
export const updateTaskTC = ( taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string,) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        let apiModel: UpdateTask = {
            priority: task.priority,
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            startDate: task.startDate,
            description: task.description,
                ...domainModel
        }
        todoListApi.updateTask(todoListId, taskId, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskId, domainModel, todoListId)
                dispatch(action)
            })
    }
}

