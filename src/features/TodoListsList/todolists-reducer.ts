import {Dispatch} from 'redux'
import {todoListApi, TodoListType} from '../../api/todoList-api'
import {
    RequestStatusType, setErrorACType,
    setStatusAC,
    setStatusACType,
} from '../../app/app-reducer'
import {handleServerNetworkError} from "../../utils/error-utils";

// let initialState: Array<TodoListType> = [
//     {id: todoListId1, title: 'What to learn ', filter: 'all'},
//     {id: todoListId2, title: 'What to learn ', filter: 'all'},
// ]

let initialState: Array<TodoListDomainType> = []
export type InitialStateType = typeof initialState

export const todoListReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id != action.todoListId)
        case 'ADD-TODOLIST':
            return [
                {...action.todoList, filter: 'all', entityStatus: 'idle'},
                ...state,
            ]
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map((tl) =>
                tl.id === action.id ? {...tl, entityStatus: action.status} : tl
            )
        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) =>
                tl.id === action.id ? {...tl, title: action.newTitle} : tl
            )
        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) =>
                tl.id === action.todoListId ? {...tl, filter: action.filter} : tl
            )
        case 'SET-TODOLIST':
            return action.todoList.map((tl) => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle',
            }))
        default:
            return state
    }
}

export const changeTodoListFilterAC = (
    filter: FilterValueType,
    todoListId: string
) => ({type: 'CHANGE-TODOLIST-FILTER', filter, todoListId} as const)
export const removeTodoListAC = (todoListId: string) =>
    ({type: 'REMOVE-TODOLIST', todoListId} as const)
export const changeTodoListEntityStatusAC = (
    id: string,
    status: RequestStatusType
) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const addTodoListAC = (todoList: TodoListType) =>
    ({type: 'ADD-TODOLIST', todoList} as const)
export const setTodoListAC = (todoList: Array<TodoListType>) =>
    ({type: 'SET-TODOLIST', todoList: todoList} as const)
export const changeTodoListTitleAC = (id: string, newTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, newTitle} as const)

export type ChangeFilterACType = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export type setTodoListACType = ReturnType<typeof setTodoListAC>
export type changeTodoListEntityStatusACType = ReturnType<typeof changeTodoListEntityStatusAC>

// thunk
export const fetchTodoListTC = () => {
    return (dispatch: Dispatch<ActionsType | setStatusACType| setErrorACType >) => {
        //?типизация dispatch для примера
        dispatch(setStatusAC('loading')) //крутилка
        todoListApi.getTodoList().then((res) => {
            dispatch(setTodoListAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
            .catch((error)=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
        todoListApi.deleteTodoList(todoListId).then((res) => {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setStatusAC('succeeded'))
        })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todoListApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

}

export const changeTodoListTitleTC = (todoListId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.updateTodoList(todoListId, title)
            .then((res) => {
            dispatch(changeTodoListTitleAC(todoListId, title))
        })
            .catch((error)=>{
                handleServerNetworkError(error, dispatch)
            })
    }
}
// types
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
type ActionsType =
    | ChangeFilterACType
    | RemoveTodoListACType
    | AddTodoListACType
    | ChangeTodoListTitleACType
    | setTodoListACType
    | changeTodoListEntityStatusACType
