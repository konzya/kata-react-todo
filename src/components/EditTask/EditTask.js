import React from 'react'
import PropTypes from 'prop-types'
import './EditTask.css'

export default class EditTask extends React.Component {
  canBlur = true

  constructor(props) {
    super(props)
    this.state = {
      value: props.description,
    }
  }

  preventBlur = () => {
    this.canBlur = false
    setTimeout(() => {
      this.canBlur = true
    }, 10)
  }

  changeHandler = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onEnterPress = (e) => {
    const { onEditTask, id } = this.props
    const { value } = this.state
    if (e.keyCode === 13) {
      this.preventBlur()
      onEditTask(id, value)
    }
  }

  blurHandler = () => {
    const { onEditTask, id } = this.props
    const { value } = this.state
    if (this.canBlur) {
      onEditTask(id, value)
    }
  }

  render() {
    const { value } = this.state
    return (
      <input
        type="text"
        value={value}
        onChange={this.changeHandler}
        onKeyDown={this.onEnterPress}
        onBlur={this.blurHandler}
        className="edit"
      />
    )
  }
}

EditTask.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEditTask: PropTypes.func.isRequired,
}
