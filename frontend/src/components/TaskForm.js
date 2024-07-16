import React, { useState } from 'react';
import { createTask } from '../api';
import { Form, Button } from 'react-bootstrap';

const TaskForm = ({ token, onTaskCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { name, description, reminder };
    const { data } = await createTask(task, token);
    onTaskCreated(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task name" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Reminder</Form.Label>
        <Form.Control type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">Create Task</Button>
    </Form>
  );
};

export default TaskForm;
