import React, {ChangeEvent} from "react";
import {FilterValueType, TasksStateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
// import {Delete} from '@material-ui/icons'


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    // addTask: (title: string, todoListId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    // changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValueType | string
    removeTodoList: (todoListId: string) => void
}


export function TodoList(props: PropsType) {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    // function removeTask(id: string, todoListId: string) {      //удаление таски
    //     dispatch(removeTaskAC(id, todoListId))
    // }
    // function addTask(title: string, todoListId: string) {                //добавление новой таски
    //     dispatch(addTaskAC(title, todoListId))
    // }
    // function changeStatus(id: string, isDone: boolean, todoListId: string) {               //чекбокс
    //     dispatch(changeTaskStatusAC(id, isDone, todoListId))
    // }
    function changeTitle(id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    }

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

    let onClickAllHandler = () => props.changeFilter('all', props.id)  // в одну строчку без {}

    let onClickActiveHandler = () => {
        props.changeFilter('active', props.id)
    }
    let onClickCompletedHandler = () => {
        props.changeFilter('completed', props.id)
    }

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

    const changeTodoListTitle = (newTitle: string) => {
        // dispatch(changeTaskTitleAC(props.id, newTitle, todoListId))
        props.changeTodoListTitle(props.id, newTitle)
    }



    let taskForTodoList = tasks     // берем из объекта tasks и достаем по id
    if (props.filter === 'active') {
        taskForTodoList = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone)    //t.isDone === true
    }



    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title)=>{ dispatch(addTaskAC(title, props.id))}}/>
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
                        taskForTodoList.map(t => {
                            let onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id))
                                // props.removeTask(t.id, props.id)
                            let onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {  //  контролируемый чекбокс
                                let newIsDoneValue = event.currentTarget.checked
                                dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                                // props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                            }
                            let onChangeTitleHandler = (newValue: string) => {
                                dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                                //  контролируемый чекбокс
                                // props.changeTaskTitle(t.id, newValue, props.id)
                            }
                            //key обязательно
                            return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                {/*<input type={'checkbox'} checked={t.isDone} onChange={onChangeStatusHandler}/>*/}
                                <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                {/*<span>{t.title}</span>*/}
                                {/*<button onClick={onRemoveHandler}>x</button>*/}
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        })
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
}

