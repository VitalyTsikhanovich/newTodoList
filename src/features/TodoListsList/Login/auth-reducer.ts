


// let initialState: TasksStateType = {}

import {authAPI, LoginParamsType} from "../../../api/todoList-api";
import {Dispatch} from "redux";
import {setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


let initialState  = {
    isLoggedIn: false
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {
                ...state, isLoggedIn: action.value
            }

        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>


// thunk
export const loginTC = (data: LoginParamsType) => (
    dispatch: Dispatch
) => {
    dispatch(setStatusAC('loading')) //крутилка
    authAPI.login(data)
        .then((res) => {
       if (res.data.resultCode === 0){
           dispatch(setIsLoggedInAC(true))
           dispatch(setStatusAC('succeeded'))
       }else {
           handleServerAppError(res.data, dispatch)
       }
    })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}



// types
type ActionsType =
     | setIsLoggedInACType

