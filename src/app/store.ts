import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todoListReducer} from "../features/TodoListsList/todolists-reducer";
import {tasksReducer} from "../features/TodoListsList/tasks-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reduser";

// import thunkMiddleware from 'state-thunk'


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer

})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));  // applyMiddleware(thunkMiddleware)
// определить автоматически тип всего объекта состояния


export type AppRootStateType = ReturnType<typeof rootReducer>
// export type AppRootStateType = typeof store   типизация стора

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;