import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button } from 'react-bootstrap';

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await register({ username, email, password });
    onRegister(data.token);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
    </Form>
  );
};

export default RegisterPage;
