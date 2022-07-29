import React from "react";
import './EditTask.css';

export default class EditTask extends React.Component {

    state = {
        value: this.props.description        
    }

    canBlur = true;

    preventBlur = () => {
        this.canBlur = false;
        setTimeout(() => this.canBlur = true, 10);
    }

    changeHandler = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    onEnterPress = (e) => {
        if (e.keyCode === 13) { 
            this.preventBlur()           
            this.props.onEditTask(this.props.id, this.state.value);            
        }
    }

    blurHandler = (e) => {
        if (this.canBlur) {
            this.props.onEditTask(this.props.id, this.state.value);
        }
        
    }

    render() {        
        return (            
            <input
                type='text'
                value={this.state.value}
                onChange={this.changeHandler}
                onKeyDown={this.onEnterPress}
                onBlur={this.blurHandler}
                className="edit"></input>
        );
    }
}