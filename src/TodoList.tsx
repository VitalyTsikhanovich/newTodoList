import React, {useState, ChangeEvent} from "react";
import {FilterValueType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}


export function TodoList(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  // получаем данные из input
        setTitle(event.currentTarget.value)
    }

// let onPressHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
// if (event.charCode === 13){
//     props.addTask
// }
// }

    let onClickAllHandler = () => props.changeFilter('all')  // в одну строчку без {}

    let onClickActiveHandler = () => {
        props.changeFilter('active')
    }
    let onClickCompletedHandler = () => {
        props.changeFilter('completed')
    }

    const addTask = () => {
        setError(null)
        if (title.trim()) {                       //убранными с двух сторон пробелами (trim)
            props.addTask(title)
            setTitle('')                              //добавить таску{
        }else {
           setError('ошибка')
        }
    }


    return (
        <div>
            <h3>{props.title}
                <button>+</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                className={error ? 'error': ''}
                />
                <button onClick={addTask}> +</button>
                {error &&
                <div className='error-message'> {error}</div>
                }
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(t => {
                            let onRemoveHandler = () => props.removeTask(t.id)
                            let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //  контролируемый чекбокс
                                let newIsDoneValue = event.currentTarget.checked
                                props.changeTaskStatus(t.id, newIsDoneValue)
                            }
                            //key обязательно
                            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'} checked={t.isDone} onChange={onChangeHandler}/>
                                <span>{t.title} </span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}