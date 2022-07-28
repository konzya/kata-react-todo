import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Task.css';

export default class Task extends React.Component {
    state = {
        completed: false
    }

    toggle = () => {
        this.setState( ({completed}) => {
            return {
                completed: !completed
            }
        })
    }

    render() {

        let { description, created, id, onDeleteTask} = this.props;
        let classList = '';
        if (this.state.completed) {
            classList += ' completed';
        }
        
        return (
            <li className={classList}>
                <div className='view'>
                    <input className='toggle' 
                           type='checkbox'
                           onChange={this.toggle}></input>

                    <label>
                        <span className='description'>{description}</span>
                        <span className='created'>{formatDistanceToNow(created)}</span>
                    </label>

                    <button className='icon icon-edit'></button>
                    <button className='icon icon-destroy'
                            onClick={() => onDeleteTask(id)}></button>
                </div>
            </li>
        );
    }

}

 