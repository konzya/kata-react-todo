import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  onEnterPress = (e) => {
    const { onItemAdded, value } = this.props
    if (e.keyCode === 13) {
      onItemAdded(value)
    }
  }

  render() {
    const { value, newTaskChangeHandler } = this.props
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={newTaskChangeHandler}
        onKeyDown={this.onEnterPress}
      />
    )
  }
}

NewTaskForm.propTypes = {
  value: PropTypes.string,
  newTaskChangeHandler: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
  value: '',
}
