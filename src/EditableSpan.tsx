import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void

}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('edit')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)

    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])
    return editMode
        ? <TextField variant={'outlined'} value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode}
                     autoFocus={true}/>
        : <span onDoubleClick={activateEditMode}>{props.title} </span>
})