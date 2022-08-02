import React from 'react';
import PropTypes from 'prop-types'
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

TasksFilter.propsTypes = {
    renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
    renderOptions: PropTypes.arrayOf(PropTypes.string),
    onRenderModeChange: PropTypes.func.isRequired
}

TasksFilter.defaultProps = {
    renderMode: 'All',
    renderOptions: ['All', 'Active', 'Completed']
}