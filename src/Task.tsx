import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";


type TaskPropsType = {
    t: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    let onRemoveHandler = () => dispatch(removeTaskAC(props.t.id, props.todoListId))
    // props.removeTask(t.id, props.id)
    let onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {  //  контролируемый чекбокс
        let newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusAC(props.t.id, newIsDoneValue, props.todoListId))
        // props.changeTaskStatus(t.id, newIsDoneValue, props.id)
    }, [dispatch, props.t.id, props.todoListId])


    let onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.t.id, newValue, props.todoListId))
        //  контролируемый чекбокс
        // props.changeTaskTitle(t.id, newValue, props.id)
    }, [dispatch, props.t.id, props.todoListId])
    //key обязательно
    return <div key={props.t.id} className={props.t.isDone ? 'is-done' : ''}>
        {/*<input type={'checkbox'} checked={t.isDone} onChange={onChangeStatusHandler}/>*/}
        <Checkbox color={'primary'} checked={props.t.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.t.title} onChange={onChangeTitleHandler}/>
        {/*<span>{t.title}</span>*/}
        {/*<button onClick={onRemoveHandler}>x</button>*/}
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>

})