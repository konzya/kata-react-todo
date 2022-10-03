import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default function TasksFilter(props) {
  const { renderOptions, renderMode, onRenderModeChange } = props

  const items = renderOptions.map((option) => (
    <li key={option}>
      <button
        className={renderMode === option ? 'selected' : ''}
        onClick={() => onRenderModeChange(option)}
        type="button"
      >
        {option}
      </button>
    </li>
  ))

  return <ul className="filters">{items}</ul>
}

TasksFilter.propsTypes = {
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  renderOptions: PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange: PropTypes.func.isRequired,
}

TasksFilter.defaultProps = {
  renderMode: 'All',
  renderOptions: ['All', 'Active', 'Completed'],
}
