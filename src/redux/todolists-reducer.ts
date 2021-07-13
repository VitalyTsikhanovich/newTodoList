
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todoListApi, TodoListType} from "../api/todoList-api";


// let initialState: Array<TodoListType> = [
//     {id: todoListId1, title: 'What to learn ', filter: 'all'},
//     {id: todoListId2, title: 'What to learn ', filter: 'all'},
// ]
// export type FilterValueType = 'all' | 'active' | 'completed'

export type FilterValueType = 'all' | 'active' | 'completed'

let initialState: Array<TodoListDomainType> = []

export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
}
export type InitialStateType = typeof initialState

export const todoListReducer = (state: InitialStateType = initialState, action: ActionsType): Array<TodoListDomainType> => {
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
            // const newTodoList : TodoListDomainType = { ...action.todoList, filter: 'all'}
            // return [newTodoList, ...state]
            return [...state,
                {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find((tl => tl.id === action.id))
            if (todoList) {
                todoList.title = action.newTitle
            }
            return [...state]
        }
        case "SET-TODOLIST": {
            return action.todoList.map(tl => {
                return {
                    ...tl, filter: 'all'
                }
            })
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
// export const addTodoListAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const addTodoListAC = (title: string) => ({type: 'ADD-TODOLIST', title, todoListId: v1()} as const)
export const setTodoListAC = (todoList: Array<TodoListType>) => ({type: 'SET-TODOLIST', todoList: todoList} as const)
export const changeTodoListTitleAC = (id: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    newTitle
} as const)




export type ChangeFilterACType = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export type setTodoListACType = ReturnType<typeof setTodoListAC>

type ActionsType =
    | ChangeFilterACType
    | RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | setTodoListACType


export const fetchTodoListTC = () => {
    return (dispatch: Dispatch) => {
        todoListApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}
