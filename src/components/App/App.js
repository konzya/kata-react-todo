import React, { useState, useEffect } from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default function App() {
  const [idCounter, setIdCounter] = useState(0)
  const [tasks, setTasks] = useState([])
  const [renderMode, setRenderMode] = useState('All')
  const [renderOptions] = useState(['All', 'Active', 'Completed'])
  const createTask = (description, sec) => {
    setIdCounter((prevId) => prevId + 1)

    return {
      description,
      created: new Date(),
      id: idCounter,
      completed: false,
      editing: false,
      timer: sec,
    }
  }

  useEffect(() => {
    setTasks([createTask('test', 10)])
  }, [])

  function toggleProperty(arr, id, propName) {
    const i = arr.findIndex((el) => el.id === id)
    const oldItem = arr[i]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, i), newItem, ...arr.slice(i + 1)]
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const newArray = prevTasks.filter((task) => task.id !== id)

      return newArray
    })
  }

  const completeTask = (id) => {
    setTasks((prevTasks) => toggleProperty(prevTasks, id, 'completed'))
  }

  const editTask = (id, description) => {
    const i = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[i]
    const newItem = { ...oldItem, editing: !oldItem.editing, description }
    const newArr = [...tasks.slice(0, i), newItem, ...tasks.slice(i + 1)]
    setTasks(newArr)
  }

  const addTask = (description, min, sec) => {
    const newItem = createTask(description, Number(min) * 60 + Number(sec))
    setTasks((prevTasks) => [...prevTasks, newItem])
  }

  const deleteAllComplete = () => {
    tasks.forEach((task) => {
      if (task.completed) deleteTask(task.id)
    })
  }

  const timerTick = (taskId) => {
    console.log('tik', taskId)
    setTasks((prevTasks) => {
      const i = prevTasks.findIndex((el) => el.id === taskId)
      const oldItem = prevTasks[i]
      const newItem = { ...oldItem, timer: oldItem.timer - 1 }
      const newArr = [...prevTasks.slice(0, i), newItem, ...prevTasks.slice(i + 1)]
      return newArr
    })
  }

  const itemsLeft = tasks.reduce((acc, task) => {
    if (!task.completed) acc++
    return acc
  }, 0)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addTask} />
      </header>

      <section className="main">
        <TaskList
          tasks={tasks}
          timerTick={timerTick}
          renderMode={renderMode}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
        <Footer
          itemsLeft={itemsLeft}
          onRenderModeChange={setRenderMode}
          onDeleteAllComplete={deleteAllComplete}
          renderMode={renderMode}
          renderOptions={renderOptions}
        />
      </section>
    </section>
  )
}
