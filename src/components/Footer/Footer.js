import React from 'react';
import './Footer.css';

import TasksFilter from '../TasksFilter/TasksFilter';

function Footer({itemsLeft,
                 onRenderModeChange, 
                 renderMode,
                 renderOptions, 
                 onDeleteAllComplete}) {
    
    return (
        <footer className='footer'>
            <span className='todo-count'>{itemsLeft} items left</span>
            <TasksFilter 
                onRenderModeChange={onRenderModeChange}
                renderMode={renderMode}
                renderOptions={renderOptions}/>
            <button className='clear-completed'
                    onClick={ () => onDeleteAllComplete() }>Clear completed</button>
        </footer>
    );
}

export default Footer;