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
import { Menu } from '@material-ui/icons'
import { TodoListList } from '../features/TodoListsList/TodoListList'
import { ErrorSnackBar } from '../components/ErrorSnackBar/ErrorSnackBar'
import { useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reduser'

function App() {
  let status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  )
  return (
    <div className="App">
      <ErrorSnackBar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todolist</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <TodoListList />
      </Container>
    </div>
  )
}

export default App
