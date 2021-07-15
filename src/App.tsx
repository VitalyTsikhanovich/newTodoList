import React, {useCallback, useEffect} from 'react';
import './App.css';
import { TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";

import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodoListTC, FilterValueType,
    removeTodoListAC, TodoListDomainType,
} from "./redux/todolists-reducer";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todoList-api";
import {
    addTaskTS,

} from "./redux/tasks-reducer";


//генерировать текстовые уникальные id


export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

function App() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, [])




    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId))                     //!!!!!
    }, [dispatch])



    // const removeTask = useCallback(function (id: string, todolistId: string) {
    //     const thunk = removeTaskTS(id, todolistId);
    //     dispatch(thunk);
    // }, []);


    // const addTask = useCallback(function (title: string, todoListId: string) {
    //     const thunk = addTaskTS(title, todoListId)
    //     dispatch(thunk)
    // }, []);

    // const changeStatus = useCallback(function (id: string, status: TaskStatuses, todoListId: string) {
    //     const action = changeTaskStatusAC(id, status, todoListId);
    //     dispatch(action);
    // }, []);

    // const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    //     const action = changeTaskTitleAC(id, newTitle, todolistId);
    //     dispatch(action);
    // }, []);



    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, netTitle: string) => {
        dispatch(changeTodoListTitleAC(id, netTitle))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {                      //кэширование функции
        dispatch(addTodoListAC(title))
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {

                        todoLists.map((tl) => {
                            let allTodolistTasks = tasks[tl.id]
                            return <Grid item >
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
            </Container>
        </div>

    );
}


export default App;
