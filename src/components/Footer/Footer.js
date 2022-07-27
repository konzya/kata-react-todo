import React from 'react';
import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer() {
    return (
        <footer className='footer'>
            <span className='todo-count'>1 items left</span>
            <TasksFilter />
            <button className='clear-completed'>Clear completed</button>
        </footer>
    );
}

export default Footer;