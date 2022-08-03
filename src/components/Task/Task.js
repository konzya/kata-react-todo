import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './Task.css'

export default class Task extends React.Component {
  clickHandler = (e) => {
    const { onEditTask, id, description } = this.props
    onEditTask(id, description)
    setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
  }

  render() {
    const { description, created, id, completed, onDeleteTask, onCompleteTask } = this.props
    const delId = `${id}del`
    const editId = `${id}edit`

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={!!completed} onChange={() => onCompleteTask(id)} id={id} />

        <label htmlFor={`${id} ${delId} ${editId}`}>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(created)}</span>
        </label>

        <button className="icon icon-edit" onClick={this.clickHandler} type="button" id={editId} />
        <button className="icon icon-destroy" onClick={() => onDeleteTask(id)} type="button" id={delId} />
      </div>
    )
  }
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
}
