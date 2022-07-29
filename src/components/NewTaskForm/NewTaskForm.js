import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
    state = {
        value: ''
    }

    changeHandler = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13) {
            this.props.onItemAdded(this.state.value)
            this.setState({
                value: ''
            })
        }
    }

    render() {       
        
        return (
            <input className='new-todo' 
                   placeholder='What needs to be done?'
                   autoFocus
                   value={this.state.value}
                   onChange={this.changeHandler}
                   onKeyDown={this.onEnterPress}></input>
        );
    }
    
}

 