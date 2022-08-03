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
    tasks: [this.createTask('create app'), this.createTask('make editing')],
    renderMode: 'All',
    renderOptions: ['All', 'Active', 'Completed'],
    newTaskFormText: '',
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

  addTask = (description) => {
    const newItem = this.createTask(description)
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
      newTaskFormText: '',
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

  createTask(description) {
    return {
      description,
      created: new Date(),
      id: this.idCounter++,
      completed: false,
      editing: false,
    }
  }

  render() {
    const { tasks, newTaskFormText, renderMode, renderOptions } = this.state
    const itemsLeft = tasks.reduce((acc, task) => {
      if (!task.completed) acc++
      return acc
    }, 0)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            value={newTaskFormText}
            newTaskChangeHandler={this.newTaskChangeHandler}
            onItemAdded={this.addTask}
          />
        </header>

        <section className="main">
          <TaskList
            tasks={tasks}
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
