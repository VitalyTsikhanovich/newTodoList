import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button, CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodoListList} from '../features/TodoListsList/TodoListList'
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {AppInitializedTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Login} from "../features/TodoListsList/Login/Login";
import {logoutTC} from "../features/TodoListsList/Login/auth-reducer";

function App() {

    const dispatch = useDispatch()
    let status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    let isInitialized = useSelector<AppRootStateType, boolean>((state =>state.app.isInitialized ))
    let isLoggedIn = useSelector<AppRootStateType, boolean>((state =>state.auth.isLoggedIn ))
    useEffect(()=>{
        dispatch(AppInitializedTC)
    },[dispatch])
    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[dispatch])

    if (!isInitialized){
        return <CircularProgress />
    }




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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
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
