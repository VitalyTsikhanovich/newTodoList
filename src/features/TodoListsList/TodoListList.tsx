import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListTC,
    FilterValueType,
    removeTodoListTC,
    TodoListDomainType
} from "./todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList/TodoList";
import {TasksStateType} from "./tasks-reducer";


export const TodoListList: React.FC = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, [])


    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId))                     //!!!!!
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        let thunk = removeTodoListTC(todoListId)
        dispatch(thunk)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, netTitle: string) => {
        let thunk = changeTodoListTitleTC(todoListId, netTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let thunk = addTodoListTC(title)                                 //кэширование функции
        dispatch(thunk)
    }, [dispatch])
    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item>
                        <Paper style={{padding: "10px"}}>
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}