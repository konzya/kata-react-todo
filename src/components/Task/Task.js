import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import formatSecondsForTimer from '../../helpers'
import './Task.css'

export default function Task({
  description,
  created,
  id,
  timer,
  completed,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
  timerTick,
}) {
  const delId = `${id}del`
  const editId = `${id}edit`

  const timerID = useRef(null)

  const startTimer = () => {
    if (completed) return
    if (!timer) return
    if (timerID.current) return

    timerID.current = setInterval(() => timerTick(id), 1000)
  }

  const stopTimer = () => {
    clearInterval(timerID.current)
    timerID.current = null
  }

  useEffect(() => {
    if (completed) {
      stopTimer()
    }
    if (!timer) {
      stopTimer()
    }
  }, [completed, timer])

  useEffect(() => () => stopTimer(), [])

  const editHandler = (e) => {
    onEditTask(id, description)
    setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
  }

  const deleteHandler = () => {
    onDeleteTask(id)
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={!!completed} onChange={() => onCompleteTask(id)} id={id} />

      <label htmlFor={`${id} ${delId} ${editId}`}>
        <span className="title">{description}</span>
        <span className="description">
          <button className="icon icon-play" type="button" onClick={startTimer} />
          <button className="icon icon-pause" type="button" onClick={stopTimer} />
          {timer ? formatSecondsForTimer(timer) : 'time is up'}
        </span>
        <span className="description">{`created ${formatDistanceToNow(created)} ago`}</span>
      </label>

      <button className="icon icon-edit" onClick={editHandler} type="button" id={editId} />
      <button className="icon icon-destroy" onClick={deleteHandler} type="button" id={delId} />
    </div>
  )
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
