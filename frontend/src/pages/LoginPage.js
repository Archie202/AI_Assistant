import React, { useState } from 'react';
import { login } from '../api';
import { Form, Button } from 'react-bootstrap';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({ email, password });
    onLogin(data.token);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      </Form.Group>
      <Button variant="primary" type="submit">Login</Button>
    </Form>
  );
};

export default LoginPage;
