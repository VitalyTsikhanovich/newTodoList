import React, {ChangeEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {Add, AddBox, Title} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string ) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) =>{

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
            setError('Title is required')
        }
    }
    return (

        <div>
            <TextField variant={'outlined'}
                       value={title}
                   onChange={onChangeHandler}
                       label={'Title'}
                       helperText={error}
                       error={!!error}
            />
            <IconButton color={'primary'} onClick={addTask}>
            <AddBox/>
            </IconButton>
            {/*<Button variant={'contained'} color={'primary'} onClick={addTask}> +</Button>*/}
            {/*<button onClick={addTask}> +</button>*/}
            {/*{error &&*/}
            {/*// <div className='error-message'> {error}</div>*/}
            {/*}*/}
        </div>

    )
})