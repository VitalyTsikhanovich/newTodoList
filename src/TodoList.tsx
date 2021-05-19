import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
// import {Delete} from '@material-ui/icons'


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string)=>void
    filter: FilterValueType | string
    removeTodoList: (todoListId: string) => void
}


export function TodoList(props: PropsType) {

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
const addTask = (title: string)=>{
    props.addTask(title, props.id)
}
const changeTodoListTitle = (newTitle: string)=>{
    props.changeTodoListTitle(props.id, newTitle)
}
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
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
                        props.tasks.map(t => {
                            let onRemoveHandler = () => props.removeTask(t.id, props.id)
                            let onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {  //  контролируемый чекбокс
                                let newIsDoneValue = event.currentTarget.checked
                                props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                            }
                            let onChangeTitleHandler = (newValue: string) => {  //  контролируемый чекбокс
                                props.changeTaskTitle(t.id, newValue, props.id)
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
                <Button  color={'default'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onClickAllHandler}>All
                </Button>
                <Button  color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickActiveHandler}>Active
                </Button>
                <Button  color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

