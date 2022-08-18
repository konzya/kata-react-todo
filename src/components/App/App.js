import React from 'react'
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends React.Component {
  static toggleProperty(arr, id, propName) {
    const i = arr.findIndex((el) => el.id === id)
    const oldItem = arr[i]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, i), newItem, ...arr.slice(i + 1)]
  }

  idCounter = 0

  state = {
    tasks: [this.createTask('create app', 2), this.createTask('make editing', 50)],
    renderMode: 'All',
    renderOptions: ['All', 'Active', 'Completed'],
    newTaskFormText: '',
    newTaskFormMin: '',
    newTaskFormSec: '',
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const i = tasks.findIndex((el) => el.id === id)
      const newArray = [...tasks.slice(0, i), ...tasks.slice(i + 1)]

      return {
        tasks: newArray,
      }
    })
  }

  completeTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: App.toggleProperty(tasks, id, 'completed'),
    }))
  }

  editTask = (id, description) => {
    const { tasks } = this.state
    const i = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[i]
    const newItem = { ...oldItem, editing: !oldItem.editing, description }
    const newArr = [...tasks.slice(0, i), newItem, ...tasks.slice(i + 1)]
    this.setState(() => ({
      tasks: newArr,
    }))
  }

  addTask = () => {
    const { newTaskFormText, newTaskFormMin, newTaskFormSec } = this.state
    const newItem = this.createTask(newTaskFormText, Number(newTaskFormMin) * 60 + Number(newTaskFormSec))
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
      newTaskFormText: '',
      newTaskFormMin: '',
      newTaskFormSec: '',
    }))
  }

  setRenderMode = (mode) => {
    this.setState(() => ({
      renderMode: mode,
    }))
  }

  deleteAllComplete = () => {
    const { tasks } = this.state
    tasks.forEach((task) => {
      if (task.completed) this.deleteTask(task.id)
    })
  }

  newTaskChangeHandler = (e) => {
    this.setState({
      newTaskFormText: e.target.value,
    })
  }

  newTaskMinChangeHandler = (e) => {
    this.setState({
      newTaskFormMin: e.target.value,
    })
  }

  newTaskSecChangeHandler = (e) => {
    this.setState({
      newTaskFormSec: e.target.value,
    })
  }

  timerTick = (taskId) => {
    this.setState((state) => {
      const { tasks } = state
      const i = tasks.findIndex((el) => el.id === taskId)
      const oldItem = tasks[i]
      const newItem = { ...oldItem, timer: oldItem.timer - 1 }
      const newArr = [...tasks.slice(0, i), newItem, ...tasks.slice(i + 1)]
      return { tasks: newArr }
    })
  }

  createTask(description, sec) {
    return {
      description,
      created: new Date(),
      id: this.idCounter++,
      completed: false,
      editing: false,
      timer: sec,
    }
  }

  render() {
    const { tasks, newTaskFormText, newTaskFormMin, newTaskFormSec, renderMode, renderOptions } = this.state
    const itemsLeft = tasks.reduce((acc, task) => {
      if (!task.completed) acc++
      return acc
    }, 0)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            task={newTaskFormText}
            min={newTaskFormMin}
            sec={newTaskFormSec}
            newTaskChangeHandler={this.newTaskChangeHandler}
            newTaskMinChangeHandler={this.newTaskMinChangeHandler}
            newTaskSecChangeHandler={this.newTaskSecChangeHandler}
            onItemAdded={this.addTask}
          />
        </header>

        <section className="main">
          <TaskList
            tasks={tasks}
            timerTick={this.timerTick}
            renderMode={renderMode}
            onCompleteTask={this.completeTask}
            onDeleteTask={this.deleteTask}
            onEditTask={this.editTask}
          />
          <Footer
            itemsLeft={itemsLeft}
            onRenderModeChange={this.setRenderMode}
            onDeleteAllComplete={this.deleteAllComplete}
            renderMode={renderMode}
            renderOptions={renderOptions}
          />
        </section>
      </section>
    )
  }
}
