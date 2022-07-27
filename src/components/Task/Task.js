import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Task.css';

function Task({ description, created }) {
    return (
        <div className='view'>
            <input className='toggle' type='checkbox'></input>

            <label>
                <span className='description'>{description}</span>
                <span className='created'>{formatDistanceToNow(created)}</span>
            </label>

            <button className='icon icon-edit'></button>
            <button className='icon icon-destroy'></button>
        </div>
    );
}

export default Task;