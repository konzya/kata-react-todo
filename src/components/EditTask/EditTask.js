import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './EditTask.css'

export default function EditTask(props) {
  const { description, onEditTask, id } = props
  const [canBlur, setCanBlur] = useState(true)
  const [value, setValue] = useState(description)

  const preventBlur = () => {
    setCanBlur(false)
    setTimeout(() => setCanBlur(true), 0)
  }

  const changeHandler = (e) => setValue(e.target.value)

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      preventBlur()
      onEditTask(id, value)
    }
    if (e.keyCode === 27) {
      setValue(description)
      setTimeout(() => e.target.blur(), 0)
    }
  }

  const blurHandler = () => {
    if (canBlur) {
      onEditTask(id, value)
    }
  }

  return (
    <input
      type="text"
      value={value}
      onChange={changeHandler}
      onKeyDown={onKeyDownHandler}
      onBlur={blurHandler}
      className="edit"
    />
  )
}

EditTask.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEditTask: PropTypes.func.isRequired,
}
