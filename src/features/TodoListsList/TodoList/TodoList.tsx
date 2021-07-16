import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskTS,
    fetchTasksTC,
} from "../../../redux/tasks-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todoList-api";
import {FilterValueType, TodoListDomainType} from "../../../redux/todolists-reducer";
import {AppRootStateType} from "../../../store/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";



type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValueType, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
}


export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))  //запрос тасок по id tl
    }, [])

    const addTask = useCallback(( title: string)=> {    //добавление новой таски
        const thunk = addTaskTS(title, props.id )
        dispatch(thunk)
    }, []);



    let onClickAllHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])  // в одну строчку без {}
    let onClickActiveHandler = useCallback(() => {props.changeFilter('active', props.id)}, [props.changeFilter, props.id])
    let onClickCompletedHandler = useCallback(() => {props.changeFilter('completed', props.id)}, [props.changeFilter, props.id])


    let removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    // function changeTitle(id: string, newTitle: string, todoListId: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todoListId))
    // }
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
            <AddItemForm addItem={addTask}/>
            <div>
                <div>
                    {
                        taskForTodoList.map(t =>
                        <Task t={t} todoListId={props.id} key={t.id}
                        />
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

