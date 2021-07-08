import React, {useEffect, useState} from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {todoListApi} from "../api/todoList-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todoListApi.getTodoList()
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTodoList('terde')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListId = 'c1699f90-4a60-4cd1-b423-2bb5dce1f8db'
        todoListApi.deleteTodoList(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListApi.updateTodoList('4c092872-3c11-45cd-847a-673b75693601', 'terdew')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '4c092872-3c11-45cd-847a-673b75693601'
        todoListApi.getTasks(todoListId)
            .then((response) => {
                setState(response.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')

    const deleteTask = () => {
        const todoListId = '375a464e-4aa1-4bd4-98b1-0a9b2af8759b'
        const tasktId = ''
        todoListApi.deleteTask(todoListId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=>{setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete</button>
        </div>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTask('uruu')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}



