


// let initialState: TasksStateType = {}

import {authAPI, LoginParamsType} from "../../../api/todoList-api";
import {Dispatch} from "redux";
import {setStatusAC} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {TasksStateType} from "../tasks-reducer";

let initialState: TasksStateType = {}
export type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {


        default:
            return state
    }
}

// export const removeTaskAC = (taskId: string, todoListId: string) => ({type: 'REMOVE-TASK', taskId, todoListId} as const)


// export type removeTaskACType = ReturnType<typeof removeTaskAC>


// thunk
export const loginTC = (data: LoginParamsType) => (
    dispatch: Dispatch
) => {
    dispatch(setStatusAC('loading')) //крутилка
    authAPI.login(data)
        .then((res) => {
       if (res.data.resultCode === 0){
           alert('yyyo')
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
type ActionsType = any
//     | removeTaskACType

