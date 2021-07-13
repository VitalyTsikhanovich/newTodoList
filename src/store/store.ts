import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todoListReducer} from "../redux/todolists-reducer";
import {tasksReducer} from "../redux/tasks-reducer";
import thunkMiddleware from "redux-thunk";

// import thunkMiddleware from 'redux-thunk'


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    filter: todoListReducer

})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));  // applyMiddleware(thunkMiddleware)
// определить автоматически тип всего объекта состояния


export type AppRootStateType = ReturnType<typeof rootReducer>
// export type AppRootStateType = typeof store   типизация стора

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;