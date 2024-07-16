import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskPage = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm token={token} onTaskCreated={handleTaskCreated} />
      <TaskList token={token} tasks={tasks} />
    </div>
  );
};

export default TaskPage;
