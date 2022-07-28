import React from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends React.Component {
  state = {
    tasks: [
      {description: 'Completed task', created: new Date(), id: 1},
      {description: 'Editing task', created: new Date(), id: 2},
      {description: 'Active task', created: new Date(), id: 3},
    ]
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const i = tasks.findIndex((el) => el.id === id);
      const newArray = [...tasks.slice(0, i), ...tasks.slice(i + 1)];

      return {
        tasks: newArray
      }
    });
  }
  
  render() {
    return (
      <section className='todoapp'>
  
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm />
        </header>
  
        <section className='main'>
          <TaskList 
            tasks={this.state.tasks} 
            onDeleteTask={this.deleteTask}/>
          <Footer />
        </section>
      </section>
    );
  }  
}

 