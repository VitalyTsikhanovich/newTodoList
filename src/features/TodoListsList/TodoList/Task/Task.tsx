import { useDispatch } from 'react-redux'
import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TaskStatuses, TaskType } from '../../../../api/todoList-api'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { removeTaskTS, updateTaskTC } from '../../tasks-reducer'

type TaskPropsType = {
  t: TaskType
  todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch()
  // удаление таски
  let onRemoveHandler = useCallback(() => {
    const thunk = removeTaskTS(props.t.id, props.todoListId)
    dispatch(thunk)
  }, [])

  // let onRemoveHandler = () => dispatch(removeTaskAC(props.t.id, props.todoListId))
  // let onRemoveHandler = useCallback(()=>props.removeTask(props.t.id, props.todoListId),[props.t.id, props.todoListId])

  // контролируемый чекбокс
  let onChangeStatusHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = event.currentTarget.checked
      let thunk = updateTaskTC(
        props.t.id,
        { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New },
        props.todoListId
      )
      dispatch(thunk)
      // dispatch(changeTaskStatusAC(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId))
      // props.changeTaskStatus(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    },
    [props.t.id, props.todoListId]
  )

  let onChangeTitleHandler = useCallback(
    (newValue: string) => {
      let thunk = updateTaskTC(
        props.t.id,
        { title: newValue },
        props.todoListId
      )
      dispatch(thunk)
      // dispatch(updateTaskAC(props.t.id, {title:newValue}, props.todoListId))
      // props.changeTaskTitle(props.t.id, newValue, props.todoListId)
    },
    [props.t.id, props.todoListId]
  )
  //key обязательно
  return (
    <div
      key={props.t.id}
      className={props.t.status === TaskStatuses.New ? 'is-done' : ''}
    >
      <Checkbox
        color={'primary'}
        checked={props.t.status === TaskStatuses.Completed}
        onChange={onChangeStatusHandler}
      />
      <EditableSpan title={props.t.title} onChange={onChangeTitleHandler} />

      <IconButton onClick={onRemoveHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
