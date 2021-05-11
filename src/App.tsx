import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';

//генерировать текстовые уникальные id


export type FilterValueType = 'all' | 'active' | 'completed'


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'rde', isDone: true},
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')






    let taskForTodoList = tasks

    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodoList = tasks.filter(t => t.isDone)    //t.isDone === true
    }


    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }


    function removeTask(id: string) {                 // удаление таски
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {                //добавление новой таски
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)

    }

    function changeStatus(id: string, isDone: boolean) {                //чекбокс
        let task = tasks.find(t => t.id === id)
        if (task) {   // псевдоистина
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title={' What to learn'}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
