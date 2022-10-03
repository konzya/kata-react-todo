import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import './NewTaskForm.css'

function NumberInput({ placeholder, state, setState }) {
  const closeError = useRef(
    debounce(() => {
      setState((prev) => ({ ...prev, error: null }))
    }, 1111)
  )

  return (
    <div className="number-input-wrapper">
      <input
        className="new-todo-form__timer"
        placeholder={placeholder}
        value={state.value}
        type="number"
        min="0"
        max="59"
        step="1"
        onFocus={() => setState((prev) => ({ ...prev, focus: true }))}
        onBlur={() => setState((prev) => ({ ...prev, focus: false }))}
        onKeyDown={(e) => {
          if (e.key === '.') e.preventDefault()
          if (e.key === ',') e.preventDefault()
          if (e.key === '-') e.preventDefault()
        }}
        onInput={(e) => {
          if (e.target.value > 59) {
            setState((prev) => ({ ...prev, error: new Error('Max value 59'), value: 59 }))
            closeError.current()
            return
          }
          setState((prev) => ({ ...prev, value: e.target.value }))
        }}
      />
      {state.error ? <span className="new-todo-form__error">{state.error.message}</span> : null}
    </div>
  )
}

export default function NewTaskForm({ onItemAdded }) {
  const [taskDescription, setTaskDescription] = useState({
    value: '',
    focus: false,
    error: null,
  })
  const [timerMin, setTimerMin] = useState({
    value: '',
    focus: false,
    error: null,
  })
  const [timerSec, setTimerSec] = useState({
    value: '',
    focus: false,
    error: null,
  })

  const closeDescriptionError = useRef(
    debounce(() => {
      setTaskDescription((prev) => ({ ...prev, error: null }))
    }, 1111)
  )

  const onSubmit = (e) => {
    e.preventDefault()

    if (taskDescription.value === '' && (timerMin.focus || timerSec.focus)) return

    if (taskDescription.value === '') {
      setTaskDescription((prev) => ({ ...prev, error: new Error('this field is required') }))
      closeDescriptionError.current()
      return
    }

    if (timerMin.value === '') {
      setTimerMin((prev) => ({ ...prev, value: 0 }))
    }

    if (timerSec.value === '') {
      setTimerSec((prev) => ({ ...prev, value: 0 }))
    }

    onItemAdded(taskDescription.value, timerMin.value, timerSec.value)
    setTaskDescription((prev) => ({ ...prev, value: '' }))
    setTimerMin((prev) => ({ ...prev, value: '' }))
    setTimerSec((prev) => ({ ...prev, value: '' }))
    e.target.querySelectorAll('input').forEach((input) => input.blur())
  }

  useEffect(() => {
    if ((timerMin.focus || timerSec.focus) && taskDescription.value === '') {
      setTaskDescription((prev) => ({ ...prev, error: new Error('You miss this field') }))
    } else {
      setTaskDescription((prev) => ({ ...prev, error: null }))
    }
  }, [timerMin.focus, timerSec.focus, taskDescription.value])

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <div className="text-input-wrapper">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={taskDescription.value}
          type="text"
          onChange={(e) => setTaskDescription((prev) => ({ ...prev, value: e.target.value }))}
        />
        {taskDescription.error ? <span className="new-todo-form__error">{taskDescription.error.message}</span> : null}
      </div>

      <NumberInput placeholder="min" state={timerMin} setState={setTimerMin} />
      <NumberInput placeholder="sec" state={timerSec} setState={setTimerSec} />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

NumberInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  state: PropTypes.shape({
    value: PropTypes.string.isRequired,
    focus: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.instanceOf(Error).isRequired, PropTypes.oneOf([null])]),
  }).isRequired,
  setState: PropTypes.func.isRequired,
}
