import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../api';
import { ListGroup, Button } from 'react-bootstrap';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await fetchTasks(token);
      setTasks(data);
    };
    getTasks();
  }, [token]);

  const handleUpdate = async (id, updatedTask) => {
    await updateTask(id, updatedTask, token);
    setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1>Task List</h1>
      <ListGroup className="task-list">
        {tasks.map(task => (
          <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-center">
            <span>{task.name}</span>
            <div>
              <Button
                variant={task.completed ? 'secondary' : 'success'}
                onClick={() => handleUpdate(task._id, { ...task, completed: !task.completed })}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </Button>
              <Button variant="danger" onClick={() => handleDelete(task._id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
