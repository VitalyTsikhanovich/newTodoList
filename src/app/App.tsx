import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todoList-api";
import {TodoListList} from "../features/TodoListsList/TodoListList";


//генерировать текстовые уникальные id


export type TasksStateType = {
    [key: string]: Array<TaskType>,
}

function App() {


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
                <TodoListList/>
            </Container>
        </div>

    );
}

export default App;
