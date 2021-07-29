import { Dispatch } from 'redux'
import {
  setErrorAC,
  setErrorACType,
  setStatusAC,
  setStatusACType,
} from '../app/app-reducer'
import { ResponseType } from '../api/todoList-api'
export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch<setErrorACType | setStatusACType>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC('Some error occurred'))
  }
  dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<setErrorACType | setStatusACType>
) => {
  dispatch(setErrorAC(error.message ? error.message : 'Some error'))
  dispatch(setStatusAC('failed'))
}
