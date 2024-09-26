import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './Component/TaskForm';
//import TaskList from './TaskList';
import './App.css'; // Keep the CSS file for your own styling

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from the backend
  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.log(error));
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List Application</h1>
      </header>
      <div className="App-content">
        <TaskForm 
          currentTask={currentTask} 
          fetchTasks={fetchTasks} 
          setCurrentTask={setCurrentTask} 
        />
        {/* <TaskList 
          tasks={tasks} 
          fetchTasks={fetchTasks} 
          setCurrentTask={setCurrentTask} 
        /> */}
      </div>
    </div>
  );
}

export default App;
