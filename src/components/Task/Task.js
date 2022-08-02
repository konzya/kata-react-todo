import React from 'react';
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './Task.css';

export default class Task extends React.Component {

    clickHandler = (e) => {
        this.props.onEditTask(this.props.id, this.props.description)
        setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
        
    }
    
    render() {

        let { description,
              created, 
              id, 
              completed,                
              onDeleteTask,               
              onCompleteTask} = this.props;
              
        
        return (            
                <div className='view'>
                    <input className='toggle' 
                           type='checkbox'
                           checked={completed ? true : false}
                           onChange={() => onCompleteTask(id)}></input>

                    <label>
                        <span className='description'>{description}</span>
                        <span className='created'>{formatDistanceToNow(created)}</span>
                    </label>

                    <button className='icon icon-edit'
                            onClick={this.clickHandler}></button>
                    <button className='icon icon-destroy'
                            onClick={() => onDeleteTask(id)}></button>
                </div>
            
        );
    }
}

 Task.propTypes = {
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onCompleteTask: PropTypes.func.isRequired
 }