import { error } from 'node:console'
import {
  AddTodoListACType,
  RemoveTodoListACType,
  setTodoListACType,
} from './todolists-reducer'
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todoListApi,
  UpdateTask,
} from '../../api/todoList-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from '../../app/store'

import {
  setErrorAC,
  setErrorACType,
  setStatusAC,
  setStatusACType,
} from '../../app/app-reducer'
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../../utils/error-utils'

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

export const tasksReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (t) => t.id !== action.taskId
        ),
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      }

    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todoList.id]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.todoListId]
      return stateCopy
    }
    case 'SET-TODOLIST': {
      const stateCopy = { ...state }
      action.todoList.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'SET-TASK':
      return { ...state, [action.todoListIs]: action.tasks }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todoListId: string) =>
  ({ type: 'REMOVE-TASK', taskId, todoListId } as const)
export const addTaskAC = (task: TaskType) =>
  ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todoListId: string
) =>
  ({
    type: 'UPDATE-TASK',
    taskId,
    model,
    todoListId,
  } as const)
export const setTaskAC = (tasks: Array<TaskType>, todoListIs: string) =>
  ({
    type: 'SET-TASK',
    tasks,
    todoListIs,
  } as const)

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type setTaskACType = ReturnType<typeof setTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>

// thunk
export const fetchTasksTC = (todoListId: string) => (
  dispatch: Dispatch<ActionsType | setStatusACType>
) => {
  dispatch(setStatusAC('loading')) //крутилка
  todoListApi.getTasks(todoListId).then((res) => {
    dispatch(setTaskAC(res.data.items, todoListId))
    dispatch(setStatusAC('succeeded'))
  })
}

export const removeTaskTS = (taskId: string, todoListId: string) => (
  dispatch: Dispatch
) => {
  todoListApi.deleteTask(todoListId, taskId).then((res) => {
    const action = removeTaskAC(taskId, todoListId)
    dispatch(action)
  })
}

export const addTaskTS = (title: string, todoListId: string) => (
  dispatch: Dispatch
) => {
  dispatch(setStatusAC('loading'))
  todoListApi
    .createTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const task = res.data.data.item
        const action = addTaskAC(task)
        dispatch(action)
        dispatch(setStatusAC('succeeded'))
      } else {
        if (res.data.messages.length) {
          dispatch(setErrorAC(res.data.messages[0]))
        } else {
          dispatch(setErrorAC('Some error occurred'))
        }
        dispatch(setStatusAC('failed'))
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
  todoListId: string
) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const state = getState()
  const task = state.tasks[todoListId].find((t) => t.id === taskId)
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
    ...domainModel,
  }
  todoListApi
    .updateTask(todoListId, taskId, apiModel)
    .then((res) => {
      if (res.data.resultCode === 0) {
        const action = updateTaskAC(taskId, domainModel, todoListId)
        dispatch(action)
      } else {
        handleServerAppError(res.data, dispatch)
        //   if (res.data.messages.length) {
        //     dispatch(setErrorAC(res.data.messages[0]))
        //   } else {
        //     dispatch(setErrorAC('Some error occurred'))
        //   }
        //   dispatch(setStatusAC('failed'))
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

// types
type ActionsType =
  | removeTaskACType
  | addTaskACType
  | AddTodoListACType
  | RemoveTodoListACType
  | setTodoListACType
  | setTaskACType
  | UpdateTaskACType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksStateType = {
  [key: string]: Array<TaskType> //генерировать текстовые уникальные id
}
