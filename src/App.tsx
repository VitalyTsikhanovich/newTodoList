import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch} from "react-redux";

import { removeTodoListAC} from "./redux/todolists-reducer";
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

    const dispatch = useDispatch()

// const todoLists = useSelector<AppRootStateType>(state => state.todoList)
    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn ', filter: 'all'},
        {id: todoListId2, title: 'What to learn ', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ]
    })


    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
        // dispatch(changeFilterAC(value, todoListId))                     //!!!!!
    }

    function removeTask(id: string, todoListId: string) {
        let tasks1 = tasks[todoListId]                                                       // удаление таски
        let filteredTasks = tasks1.filter(t => t.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {                //добавление новой таски
        let task = {id: v1(), title: title, isDone: false}
        //достаем нужный массив по todoListId
        let tasks1 = tasks[todoListId]
        // let newTask = [task, ...tasks1]
        tasks[todoListId] = [task, ...tasks1]
        setTasks({...tasks})

    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let tasks1 = tasks[todoListId]                                                    //чекбокс
        let task = tasks1.find(t => t.id === id)
        if (task) {   // псевдоистина
            task.isDone = isDone
            // tasks[todoListId] = task
            setTasks({...tasks})
        }
    }

    function changeTitle(id: string, newTitle: string, todoListId: string) {
        //достаем нужный массив по todoListId
        let tasks1 = tasks[todoListId]                                 //чекбокс
        //найдем нужную таску
        let task = tasks1.find(t => t.id === id)
        //изменим таску если она нашлась
        if (task) {                                      // псевдоистина
            task.title = newTitle
            // tasks[todoListId] = task
            //засетаем в стейт копию объекта, что бы React отреагировал перерисовкой
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id != todoListId)
        setTodoLists(filteredTodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
        // dispatch(removeTodoListAC(todoListId))

    }

    function changeTodoListTitle(id: string, netTitle: string) {
        let todoList = todoLists.find((tl => tl.id === id))
        if (todoList) {
            todoList.title = netTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }




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
                            let taskForTodoList = tasks[tl.id]      // берем из объекта tasks и достаем по id
                            if (tl.filter === 'active') {
                                taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone)    //t.isDone === true
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTitle}
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
