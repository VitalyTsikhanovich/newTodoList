import {Dispatch} from "redux";
import {todoListApi, TodoListType} from "../api/todoList-api";


// let initialState: Array<TodoListType> = [
//     {id: todoListId1, title: 'What to learn ', filter: 'all'},
//     {id: todoListId2, title: 'What to learn ', filter: 'all'},
// ]

let initialState: Array<TodoListDomainType> = []
export type InitialStateType = typeof initialState

export const todoListReducer = (state: InitialStateType = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.todoListId)
        case "ADD-TODOLIST":
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl=> tl.id ===action.todoListId ? { ...tl, filter: action.filter}: tl)
        case "SET-TODOLIST":
            return action.todoList.map(tl=>({...tl, filter: 'all'}))
        default:
            return state
    }
}


export const changeTodoListFilterAC = (filter: FilterValueType, todoListId: string) => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId} as const)
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE-TODOLIST', todoListId} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const setTodoListAC = (todoList: Array<TodoListType>) => ({type: 'SET-TODOLIST', todoList: todoList} as const)
export const changeTodoListTitleAC = (id: string, newTitle: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, newTitle} as const)

export type ChangeFilterACType = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export type setTodoListACType = ReturnType<typeof setTodoListAC>

// thunk
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {             //типизация dispatch для примера
        todoListApi.getTodoList()
            .then((res) => {
                dispatch(setTodoListAC(res.data))
            })
    }
}

export const removeTodoListTC = ( todoListId: string,) => {
    return (dispatch: Dispatch) => {
        todoListApi.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodoListAC(todoListId))
            })
    }
}

export const addTodoListTC = ( title: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}

export const changeTodoListTitleTC = ( todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.updateTodoList(todoListId, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(todoListId, title))
            })
    }
}
// types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
}
type ActionsType =
    | ChangeFilterACType
    | RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | setTodoListACType