import React from 'react';
import './App.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

function App() {
  const tasks = [
    {description: 'Completed task', created: new Date(), status: 'completed'},
    {description: 'Editing task', created: new Date(), status: 'editing'},
    {description: 'Active task', created: new Date(), status: ''},
  ];

  return (
    <section className='todoapp'>

      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm />
      </header>

      <section className='main'>
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  );
}

export default App;