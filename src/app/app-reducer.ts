import {Dispatch} from "redux";
import {authAPI} from "../api/todoList-api";
import {setIsLoggedInAC} from "../features/TodoListsList/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-APP-INITIALIZED":
            return {
                ...state, isInitialized: action.value
            }
        default:
            return state
    }
}


export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-APP-INITIALIZED', value} as const)

// thunk
export const AppInitializedTC = (dispatch: Dispatch) => {
    authAPI.me()
        .then((res)=>{
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))

            }else {

            }
            dispatch(setAppInitializedAC(true))
        })
}


// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если ошибка глобальна, сюда запишет текст ошибки
    error: string | null
    // true когда приложение проинициализировалось
    isInitialized: boolean
}

export type setErrorACType = ReturnType<typeof setErrorAC>
export type setStatusACType = ReturnType<typeof setStatusAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>

type ActionsType = setErrorACType
    | setStatusACType
    | setAppInitializedACType