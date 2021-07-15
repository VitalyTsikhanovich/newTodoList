import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todoList-api";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskTS} from "./redux/tasks-reducer";


type TaskPropsType = {
    t: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    let onRemoveHandler = useCallback(() => {                //удаление таски
        const thunk = removeTaskTS(props.t.id, props.todoListId);
        dispatch(thunk);

    }, [])

    // let onRemoveHandler = () => dispatch(removeTaskAC(props.t.id, props.todoListId))
    // let onRemoveHandler = useCallback(()=>props.removeTask(props.t.id, props.todoListId),[props.t.id, props.todoListId])


    let onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {  //  контролируемый чекбокс
        let newIsDoneValue = event.currentTarget.checked
        dispatch(changeTaskStatusAC(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId))
        // props.changeTaskStatus(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }, [props.t.id, props.todoListId])


    let onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.t.id, newValue, props.todoListId))
        // props.changeTaskTitle(props.t.id, newValue, props.todoListId)
    }, [props.t.id, props.todoListId])
    //key обязательно
    return <div key={props.t.id} className={props.t.status === TaskStatuses.New ? 'is-done' : ''}>

        <Checkbox color={'primary'} checked={props.t.status === TaskStatuses.Completed}
                  onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.t.title} onChange={onChangeTitleHandler}/>


        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>

})