import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';

function TaskList({tasks}) {
    let items = tasks.map((task) => {
        const {status, ...list} = task;
        return (
            <li className={status}>
                <Task {...list}/>
            </li>
        );
    })

    return (
        <ul className='todo-list'>
            {items}
        </ul>
    );
}

export default TaskList;