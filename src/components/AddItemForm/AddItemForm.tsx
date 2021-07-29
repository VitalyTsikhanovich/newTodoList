import React, { ChangeEvent, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(
  ({ addItem, disabled = false }: AddItemFormPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      // получаем данные из input
      setTitle(event.currentTarget.value)
      setError(null)
    }
    const addItemHandler = () => {
      if (title.trim() !== '') {
        //убранными с двух сторон пробелами (trim)
        addItem(title)
        setTitle('') //добавить таску
      } else {
        setError('Title is required')
      }
    }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (error !== null) {
    //         setError(null);
    //     }
    //     if (e.charCode === 13) {
    //         addItem();
    //     }
    // }

    // let onPressHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
    // if (event.charCode === 13){
    //     props.addTask
    // }
    // }

    return (
      <div>
        <TextField
          variant={'outlined'}
          value={title}
          onChange={onChangeHandler}
          label={'Title'}
          helperText={error}
          error={!!error}
          disabled={disabled}
        />
        <IconButton
          color={'primary'}
          onClick={addItemHandler}
          disabled={disabled}
        >
          <AddBox />
        </IconButton>
        {/*<Button variant={'contained'} color={'primary'} onClick={addTask}> +</Button>*/}
        {/*<button onClick={addTask}> +</button>*/}
        {/*{error &&*/}
        {/*// <div className='error-message'> {error}</div>*/}
        {/*}*/}
      </div>
    )
  }
)
