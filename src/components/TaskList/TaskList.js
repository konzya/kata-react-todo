import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({ tasks, onDeleteTask }) {
    let items = tasks.map((task) => {
        return (
            <Task {...task} key={task.id} onDeleteTask={onDeleteTask} />
        );
    })

    return (
        <ul className='todo-list'>
            {items}
        </ul>
    );
}

export default TaskList;