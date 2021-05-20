import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


// let initialState: Array<TodoListType> = [
//     {id: todoListId1, title: 'What to learn ', filter: 'all'},
//     {id: todoListId2, title: 'What to learn ', filter: 'all'},
// ]

let initialState: Array<TodoListType> = []

export type InitialStateType = typeof initialState

export const todoListReducer = (state: InitialStateType = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER": {
            let todiList = state.find(tl => tl.id === action.todoListId)
            if (todiList) {
                todiList.filter = action.value
            }
            return [...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find((tl => tl.id === action.id))
            if (todoList) {
                todoList.title = action.netTitle
            }
            return [...state]
        }
        default:
            return state
    }
}


export const changeTodoListFilterAC = (value: FilterValueType, todoListId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    value,
    todoListId
} as const)
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE-TODOLIST', todoListId} as const)
export const addTodoListAC = (title: string) => ({type: 'ADD-TODOLIST', title: title, todoListId: v1()} as const)
export const changeTodoListTitleAC = (id: string, netTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    netTitle
} as const)


export type changeFilterACType = ReturnType<typeof changeTodoListFilterAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>

type ActionsType = changeFilterACType
    | removeTodoListACType
    | addTodoListACType
    | changeTodoListTitleACType
