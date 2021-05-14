import React, {ChangeEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  // получаем данные из input
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')                              //добавить таску{
        } else {
            setError('ошибка')
        }
    }
    return (

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}> +</button>
            {error &&
            <div className='error-message'> {error}</div>
            }
        </div>

    )
}