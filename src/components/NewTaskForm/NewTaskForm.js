import React from 'react';
import PropTypes from 'prop-types'
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {   

    onEnterPress = (e) => {
        if (e.keyCode === 13) {
            this.props.onItemAdded(this.props.value)            
        }
    }

    render() {         
        return (
            <input className='new-todo' 
                   placeholder='What needs to be done?'
                   value={this.props.value}
                   autoFocus                   
                   onChange={this.props.newTaskChangeHandler}
                   onKeyDown={this.onEnterPress}></input>
        );
    }    
}

NewTaskForm.propTypes ={
    value: PropTypes.string,
    newTaskChangeHandler: PropTypes.func.isRequired,
    onItemAdded: PropTypes.func.isRequired
}

NewTaskForm.defaultProps = {
    value: ''
}

 