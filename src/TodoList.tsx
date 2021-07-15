import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, fetchTasksTC, removeTaskAC} from "./redux/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todoList-api";
import { FilterValueType} from "./redux/todolists-reducer";
// import {Delete} from '@material-ui/icons'




type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    // addTask: (title: string, todoListId: string) => void
    // changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    // changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
}


export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    // function removeTask(id: string, todoListId: string) {      //удаление таски
    //     dispatch(removeTaskAC(id, todoListId))
    // }
    // function addTask(title: string, todoListId: string) {                //добавление новой таски
    //     dispatch(addTaskAC(title, todoListId))
    // }
    // function changeStatus(id: string, status: TaskStatuses, todoListId: string) {               //чекбокс
    //     dispatch(changeTaskStatusAC(id, status, todoListId))
    // }


    useEffect(() => {
        dispatch(fetchTasksTC(props.id))  //запрос тасок по id tl
    }, [])



    // let [title, setTitle] = useState('')
    // let [error, setError] = useState<string | null>(null)
    // let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  // получаем данные из input
    //     setTitle(event.currentTarget.value)
    //     setError(null)
    // }

// let onPressHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
// if (event.charCode === 13){
//     props.addTask
// }
// }

    let onClickAllHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])  // в одну строчку без {}
    let onClickActiveHandler = useCallback(() => {props.changeFilter('active', props.id)}, [props.changeFilter, props.id])
    let onClickCompletedHandler = useCallback(() => {props.changeFilter('completed', props.id)}, [props.changeFilter, props.id])

    // const addTask = () => {
    //     if (title.trim() !== '') {                    //убранными с двух сторон пробелами (trim)
    //         props.addTask(title, props.id)
    //         setTitle('')                              //добавить таску{
    //     } else {
    //         setError('ошибка')
    //     }
    // }


    let removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    function changeTitle(id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        // dispatch(changeTaskTitleAC(props.id, newTitle, todoListId))
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.id, props.changeTodoListTitle])


    let taskForTodoList = tasks     // берем из объекта tasks и достаем по id
    if (props.filter === 'active') {
        taskForTodoList = tasks.filter(t => t.status===TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.status===TaskStatuses.Completed)    //t.isDone === true
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={useCallback((title) => {
                dispatch(addTaskAC(title, props.id))
            }, [props.id, dispatch])}/>
            {/*<div>*/}
            {/*    <input value={title}*/}
            {/*           onChange={onChangeHandler}*/}
            {/*           className={error ? 'error' : ''}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}> +</button>*/}
            {/*    {error &&*/}
            {/*    <div className='error-message'> {error}</div>*/}
            {/*    }*/}
            {/*</div>*/}
            <div>
                <div>
                    {
                        taskForTodoList.map(t =>
                        <Task t={t} todoListId={props.id} key={t.id}/>
                        )
                    }
                </div>
            </div>
            <div>
                <Button color={'default'} variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickAllHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickActiveHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

