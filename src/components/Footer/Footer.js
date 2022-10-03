import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css'

import TasksFilter from '../TasksFilter/TasksFilter'

function Footer(props) {
  const { itemsLeft, onRenderModeChange, renderMode, renderOptions, onDeleteAllComplete } = props
  return (
    <footer className="footer">
      <span className="todo-count">{`${itemsLeft} items left`}</span>
      <TasksFilter onRenderModeChange={onRenderModeChange} renderMode={renderMode} renderOptions={renderOptions} />
      <button className="clear-completed" onClick={() => onDeleteAllComplete()} type="button">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  itemsLeft: PropTypes.number.isRequired,
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  renderOptions: PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange: PropTypes.func.isRequired,
  onDeleteAllComplete: PropTypes.func.isRequired,
}

Footer.defaultProps = {
  renderMode: 'All',
  renderOptions: ['All', 'Active', 'Completed'],
}
