import React from 'react';
import './TasksFilter.css';

export default class TasksFilter extends React.Component {
    
    key = 0
    
    render() {
        
        const {renderOptions, renderMode, onRenderModeChange} =this.props;
        
        let items = renderOptions.map( (option) => {
            return (
                <li key={this.key++}>
                    <button
                        className={renderMode === option ? 'selected' : ''}
                        onClick={() => onRenderModeChange(option)}>{option}</button>
                </li>
            );
        })

        return (
            <ul className='filters'>
                {items}
            </ul>
        );
    }

}

