import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  onEnterPress = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    onItemAdded()
  }

  render() {
    const { task, min, sec, newTaskChangeHandler, newTaskMinChangeHandler, newTaskSecChangeHandler } = this.props
    return (
      <form className="new-todo-form" onSubmit={this.onEnterPress}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={task}
          type="text"
          required
          onChange={newTaskChangeHandler}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          type="number"
          min="0"
          max="59"
          step="1"
          required
          onChange={newTaskMinChangeHandler}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          type="number"
          min="0"
          max="60"
          step="1"
          required
          onChange={newTaskSecChangeHandler}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  task: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
  newTaskChangeHandler: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
}
