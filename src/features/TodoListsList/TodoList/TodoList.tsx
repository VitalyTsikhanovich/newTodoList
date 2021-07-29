import React, { useCallback, useEffect } from 'react'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskTS, fetchTasksTC } from '../tasks-reducer'
import { Task } from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todoList-api'
import { FilterValueType, TodoListDomainType } from '../todolists-reducer'
import { AppRootStateType } from '../../../app/store'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'

type PropsType = {
  todoList: TodoListDomainType
  changeFilter: (value: FilterValueType, todoListId: string) => void
  changeTodoListTitle: (id: string, newTitle: string) => void
  //   filter: FilterValueType
  removeTodoList: (todoListId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
  const dispatch = useDispatch()
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.todoList.id]
  )

  useEffect(() => {
    dispatch(fetchTasksTC(props.todoList.id)) //запрос тасок по id tl
  }, [])

  const addTask = useCallback((title: string) => {
    //добавление новой таски
    const thunk = addTaskTS(title, props.todoList.id)
    dispatch(thunk)
  }, [])

  let onClickAllHandler = useCallback(
    () => props.changeFilter('all', props.todoList.id),
    [props.changeFilter, props.todoList.id]
  ) // в одну строчку без {}
  let onClickActiveHandler = useCallback(() => {
    props.changeFilter('active', props.todoList.id)
  }, [props.changeFilter, props.todoList.id])
  let onClickCompletedHandler = useCallback(() => {
    props.changeFilter('completed', props.todoList.id)
  }, [props.changeFilter, props.todoList.id])

  let removeTodoList = () => {
    props.removeTodoList(props.todoList.id)
  }
  // function changeTitle(id: string, newTitle: string, todoListId: string) {
  //     dispatch(changeTaskTitleAC(id, newTitle, todoListId))
  // }
  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      // dispatch(changeTaskTitleAC(props.id, newTitle, todoListId))
      props.changeTodoListTitle(props.todoList.id, newTitle)
    },
    [props.todoList.id, props.changeTodoListTitle]
  )

  let taskForTodoList = tasks // берем из объекта tasks и достаем по id
  if (props.todoList.filter === 'active') {
    taskForTodoList = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (props.todoList.filter === 'completed') {
    taskForTodoList = tasks.filter((t) => t.status === TaskStatuses.Completed) //t.isDone === true
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.todoList.title}
          onChange={changeTodoListTitle}
        />
        {/*<button onClick={removeTodoList}>x</button>*/}
        <IconButton
          onClick={removeTodoList}
          disabled={props.todoList.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={props.todoList.entityStatus === 'loading'}
      />
      <div>
        <div>
          {taskForTodoList.map((t) => (
            <Task t={t} todoListId={props.todoList.id} key={t.id} />
          ))}
        </div>
      </div>
      <div>
        <Button
          color={'default'}
          variant={props.todoList.filter === 'all' ? 'outlined' : 'text'}
          onClick={onClickAllHandler}
        >
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.todoList.filter === 'active' ? 'outlined' : 'text'}
          onClick={onClickActiveHandler}
        >
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.todoList.filter === 'completed' ? 'outlined' : 'text'}
          onClick={onClickCompletedHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
