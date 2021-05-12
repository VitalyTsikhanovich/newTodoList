import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';

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


    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn ', filter: 'all'},
        {id: todoListId2, title: 'What to learn ', filter: 'completed'},
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
    }


    function removeTask(id: string, todoListId: string) {
        let tasks1 = tasks[todoListId]                                                       // удаление таски
        let filteredTasks = tasks1.filter(t => t.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {                //добавление новой таски
        let task = {id: v1(), title: title, isDone: false}
        let tasks1 = tasks[todoListId]
        let newTask = [task, ...tasks1]
        tasks[todoListId] = newTask
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

    function removeTodoList(todoListId: string) {
        let filteredtodoList = todoLists.filter(tl => tl.id != todoListId)
        setTodoLists(filteredtodoList)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    // function removeTodoList (todoListId: string){
    //     setTodoLists(todoLists.filter(tl => tl.id != todoListId))
    //     delete tasks[todoListId]
    //     setTasks({...tasks})
    // }
    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let taskForTodoList = tasks[tl.id]      // берем из объекта tasks и достаем по id
                    if (tl.filter === 'active') {
                        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        taskForTodoList = tasks[tl.id].filter(t => t.isDone)    //t.isDone === true
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />

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
        </div>
    );
}


export default App;
