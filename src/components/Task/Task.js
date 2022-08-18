import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import formatSecondsForTimer from '../../formatSecondsForTimer'
import './Task.css'

export default class Task extends React.Component {
  timer = null

  componentDidUpdate(prevProps) {
    const { completed, timer } = this.props
    if (completed !== prevProps.completed) this.stopTimer()
    if (!timer) this.stopTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  editHandler = (e) => {
    const { onEditTask, id, description } = this.props
    onEditTask(id, description)
    setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
  }

  deleteHandler = () => {
    const { onDeleteTask, id } = this.props
    this.stopTimer()
    onDeleteTask(id)
  }

  startTimer = () => {
    const { completed, id, timerTick, timer } = this.props
    if (completed) return
    if (!timer) return
    if (this.timer) return
    this.timer = setInterval(() => {
      timerTick(id)
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { description, created, id, timer, completed, onCompleteTask } = this.props
    const delId = `${id}del`
    const editId = `${id}edit`

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={!!completed} onChange={() => onCompleteTask(id)} id={id} />

        <label htmlFor={`${id} ${delId} ${editId}`}>
          <span className="title">{description}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={this.startTimer} />
            <button className="icon icon-pause" type="button" onClick={this.stopTimer} />
            {timer ? formatSecondsForTimer(timer) : "time's up"}
          </span>
          <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
        </label>

        <button className="icon icon-edit" onClick={this.editHandler} type="button" id={editId} />
        <button className="icon icon-destroy" onClick={this.deleteHandler} type="button" id={delId} />
      </div>
    )
  }
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
}
