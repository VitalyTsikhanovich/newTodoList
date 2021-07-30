import React from 'react'
import './App.css'
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodoListList} from '../features/TodoListsList/TodoListList'
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/TodoListsList/Login/Login";

function App() {
    let status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    return (
        <BrowserRouter>
        <div className="App">
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">Todolist</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                {/*<TodoListList/>*/}
                <Switch>
                <Route  path={'/login'} render={()=> <Login />}/>
                <Route exact path={'/'} render={()=> <TodoListList/>}/>
                <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    {/*<Redirect from={'*'} to={'/login'}/>*/}
                </Switch>
            </Container>
        </div>
        </BrowserRouter>
    )
}

export default App
