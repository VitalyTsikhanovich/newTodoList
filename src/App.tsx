import React, {useCallback} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";

import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./redux/todolists-reducer";
import {AppRootStateType} from "./store/store";


//генерировать текстовые уникальные id


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('asss')
    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const changeFilter = useCallback((value: FilterValueType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId))                     //!!!!!
    }, [dispatch])


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
                    {/*<TodoList title={' What to learn'}*/}
                    {/*          tasks={taskForTodoList}*/}
                    {/*          removeTask={removeTask}*/}
                    {/*          changeFilter={changeFilter}*/}
                    {/*          addTask={addTask}*/}
                    {/*          changeTaskStatus={changeStatus}*/}
                    {/*          filter={filter}*/}
                    {/*/>*/}
                </Grid>
            </Container>
        </div>

    );
}


export default App;